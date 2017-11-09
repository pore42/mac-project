Create a react app using the create-react-app.

Go in the project folder. >  cd mri-project
Build it using. > npm run build


Open https://console.cloud.google.com/start.

On the left click menu Icon.

Scroll the menu on the right and click Storage, then click Browser.

On the top of page choose the project name (select mac-rent-informations).

Select mri-bucket. You can keep the default values, just click create and choose a Bucket's name. mri-bucket


Once the bucket has been created, click into it and select upload folder. Browse to your project directory and upload the entire build folder.


After it create an app.yaml file ( This file is a config file that tells the App Engine how to map the URLs to static files. ) 

content of: app.yaml


------------------
runtime: python27
api_version: 1
threadsafe: true
handlers:
- url: /
  static_files: build/index.html
  upload: build/index.html
- url: /
  static_dir: build
------------------


Upload this file to the bucket as well.


On the same page find the icon that lets you open a Google Cloud Shell to your app instance. Click on it and open the shell.

In this shell type:
> mkdir mri-app
> gsutil rsync -r gs://mri-bucket ./mri-app

>cd mri-app


after type:
> gcloud app deploy


You should see some sort of success message indicating the app is served, and where.
