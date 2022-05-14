import tensorflow as tf
import tensorflow_addons as tfa
from tensorflow import keras

# tf.image.random_brightness implemented in a keras preprocessing layer
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

# tfa.image.shear_x implemented in a keras preprocessing layer
class RandomShearX(keras.layers.Layer):
    def __init__(self, level, fill_value=0.0, **kwargs):
        super().__init__(**kwargs)
        self.level=level
        self.fill_value=fill_value
    
    @staticmethod
    def vectorized_shear_x(inputs, level, fill_value):
        return tf.map_fn(
            lambda inputs, level=level, fill_value=fill_value: tfa.image.shear_x(inputs, level, fill_value),
            inputs,
            parallel_iterations=16
        )
    
    def call(self, inputs, training=None):
        if training is None:
            training = keras.backend.learning_phase()
            
        if training is True:
            level = tf.random.uniform((1,), minval=-self.level, maxval=self.level)
            return RandomShearX.vectorized_shear_x(
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



# tfa.image.shear_y implemented in a keras preprocessing layer
class RandomShearY(keras.layers.Layer): 
    def __init__(self, level, fill_value=0.0, **kwargs):
        super().__init__(**kwargs)
        self.level=level
        self.fill_value=fill_value
    
    @staticmethod
    def vectorized_shear_y(inputs, level, fill_value):
        return tf.map_fn(
            lambda inputs, level=level, fill_value=fill_value: tfa.image.shear_y(inputs, level, fill_value),
            inputs,
            parallel_iterations=16
        )
    
    def call(self, inputs, training=None):
        if training is None:
            training = keras.backend.learning_phase()
            
        if training is True:
            level = tf.random.uniform((1,), minval=-self.level, maxval=self.level)
            return RandomShearY.vectorized_shear_y(
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

# tfa.image.random_cutout implemented in a keras preprocessing layer
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

# keras layer that random applies or not apply another keras layer
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