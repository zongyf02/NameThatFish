import tensorflow as tf
from tensorflow import keras
import _augmentations as aug

# Image augmentation layers
def make_aug(fill_value=0.0):
    return keras.Sequential([
        keras.layers.RandomFlip("horizontal"),
        keras.layers.RandomContrast(0.9),
        aug.RandomBrightness(90.0),
        keras.layers.RandomTranslation(0.3, 0.3, fill_mode="constant", fill_value=fill_value),
        keras.layers.RandomRotation(0.5, fill_mode="constant", fill_value=fill_value),
        aug.RandomShearX(0.5, fill_value=fill_value),
        aug.RandomShearY(0.5, fill_value=fill_value),
        keras.layers.RandomZoom(0.4, fill_mode="constant", fill_value=fill_value),
        keras.layers.Resizing(256, 256),
        aug.RandomCutout(tf.constant([32, 32]), fill_value=fill_value),
        keras.layers.ReLU(max_value=255.0, threshold=0.0)
    ])


# Model top layer
def make_top(n_classes):
    return keras.Sequential([
        keras.layers.Flatten(),
        keras.layers.Dense(n_classes, activation='softmax')
    ])

# Create the efficientNet based model
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
        make_top(n_classes)
    ])
    
    return model