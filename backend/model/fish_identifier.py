import numpy as np
import tensorflow as tf
import tensorflow_addons as tfa
from tensorflow import keras

class RandomRotate90(keras.layers.Layer):
    def call(self, inputs, training=None):
        if training is None:
            training = keras.backend.learning_phase()
        
        if training is True and tf.random.uniform((1,), minval=0, maxval=2, dtype=tf.dtypes.int32) == 0:
            return tf.image.rot90(inputs)
        else:
            return inputs

class RandomBrightness(keras.layers.Layer):
    def __init__(self, max_delta, **kwargs):
        super().__init__(**kwargs)
        self.max_delta=max_delta
        
    def call(self, inputs, training=None):
        if training is None:
            training = keras.backend.learning_phase()
        
        if training is True:
            return tf.image.random_brightness(inputs, self.max_delta)
        else:
            return inputs
        
    def get_config(self):
        config = super().get_config()
        config.update({
            "max_delta": self.max_delta
        })
        return config

def vectorized_shear_x(inputs, level, fill_value):
    return tf.map_fn(
        lambda inputs, level=level, fill_value=fill_value: tfa.image.shear_x(inputs, level, fill_value),
        inputs,
        parallel_iterations=16
    )
    
class RandomShearX(keras.layers.Layer):
    def __init__(self, level, fill_value=0.0, **kwargs):
        super().__init__(**kwargs)
        self.level=level
        self.fill_value=fill_value
    
    def call(self, inputs, training=None):
        if training is None:
            training = keras.backend.learning_phase()
            
        if training is True:
            level = tf.random.uniform((1,), minval=-self.level, maxval=self.level)
            return vectorized_shear_x(
                inputs, level[0], fill_value=self.fill_value
            )
        else:
            return inputs
        
    def get_config(self):
        config = super().get_config()
        config.update({
            "level": self.level,
            "fill_value": self.fill_value
        })
        return config

def vectorized_shear_y(inputs, level, fill_value):
    return tf.map_fn(
        lambda inputs, level=level, fill_value=fill_value: tfa.image.shear_y(inputs, level, fill_value),
        inputs,
        parallel_iterations=16
    )

class RandomShearY(keras.layers.Layer):
    def __init__(self, level, fill_value=0.0, **kwargs):
        super().__init__(**kwargs)
        self.level=level
        self.fill_value=fill_value
    
    def call(self, inputs, training=None):
        if training is None:
            training = keras.backend.learning_phase()
            
        if training is True:
            level = tf.random.uniform((1,), minval=-self.level, maxval=self.level)
            return vectorized_shear_y(
                inputs, level[0], fill_value=self.fill_value
            )
        else:
            return inputs
        
    def get_config(self):
        config = super().get_config()
        config.update({
            "level": self.level,
            "fill_value": self.fill_value
        })
        return config
    
class RandomCutout(keras.layers.Layer):
    def __init__(self, mask_size, fill_value=0.0, **kwargs):
        super().__init__(**kwargs)
        self.mask_size=mask_size
        self.fill_value=fill_value
        
    def call(self, inputs, training=None):
        if training is None:
            training = keras.backend.learning_phase()
            
        if training is True:
            return tfa.image.random_cutout(inputs, self.mask_size, self.fill_value)
        else:
            return inputs

class RandomAugmentation(keras.layers.Layer):
    def __init__(self, augmentation, prob, **kwargs):
        super().__init__(**kwargs)
        self.augmentation=augmentation
        self.prob=prob
        
    def call(self, inputs, training=None):
        if tf.random.uniform((1,), 0.0, 1.0) <= self.prob:
            return self.augmentation(inputs, training=training)
        else:
            return inputs
        
    def get_config(self):
        config = super().get_config()
        config.update({
            "augmentation": self.augmentation.get_config(),
            "prob": self.prob
        })
        return config 
            
def make_aug(fill_value=0.0):
    return keras.Sequential([
        keras.layers.RandomFlip("horizontal"),
        keras.layers.RandomContrast(0.99),
        RandomBrightness(95.0),
        keras.layers.RandomTranslation(0, 0.3, fill_mode="constant", fill_value=fill_value),
        keras.layers.RandomTranslation(0.3, 0, fill_mode="constant", fill_value=fill_value),
        keras.layers.RandomRotation(0.5, fill_mode="constant", fill_value=fill_value),
        RandomShearX(0.5, fill_value=fill_value),
        RandomShearY(0.5, fill_value=fill_value),
        keras.layers.RandomZoom(0.5, fill_mode="constant", fill_value=fill_value),
        keras.layers.Resizing(256, 256),
        RandomCutout(tf.constant([32, 32]), fill_value=fill_value),
        RandomCutout(tf.constant([32, 32]), fill_value=fill_value),
        keras.layers.ReLU(max_value=255.0, threshold=0.0)
    ])

def make_model(n_classes=20):
    efficient_net = tf.keras.applications.efficientnet_v2.EfficientNetV2B0(
        include_top=False, 
        weights="imagenet",
        input_shape=(256, 256, 3), 
        pooling="avg"
    )
    
    model = keras.Sequential([
        make_aug(fill_value=127.0),
        efficient_net,
        keras.layers.Flatten(),
        keras.layers.Dense(n_classes, activation='softmax')
    ])
    
    return model
