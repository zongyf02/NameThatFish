from absl import app
from google_images_download import google_images_download

classes = [
  "Lamphrey",
  "Sturgeon",
  # "Catfish",
  "Chinook salmon",
  # "Atlantic salmon",
  "Rainbow trout",
  # "Brook trout",
  "Northern Pike",
  "Muskie",
  "Rock Bass",
  "White Perch",
  "Pumpkinseed",
  # "Bluegill",
  "Sunfish",
  "Largemouth bass",
  "Smallmouth bass",
  "Crappie",
  "Yellow perch",
  "Walleye"
]

limit = 100

def download_images(classes, limit):
  response = google_images_download.googleimagesdownload()

  joined_classes = ','.join(classes)
  arguments = { "keywords": joined_classes, "limit": limit, "size": ">400*300", "print_urls": True }

  paths = response.download(arguments)
  print(paths)

def main(_):
  download_images(classes, limit)

if __name__ == '__main__':
  app.run(main)
  