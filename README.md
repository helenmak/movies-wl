# movies-app

## Install dependencies:

``` bash
# install server dependencies
npm install

# then install frontend dependencies
cd frontend
npm install

## Run application:

From root directory (use 2 terminal windows):

# serve frontend with hot reload at localhost:3000
npm run devstart

# serve backend at localhost:5000
npm run start
```

Before running server, run MongoDB first.
You can run application database if you set dbpath at 'database' directory in this project, or you can create your own database.
If Mongo wouldn`t connect with current database, delete all .ns and local.0 files and try again.


## Application:
To see all films in database, press 'Search' without any query.
You can separately search for movies by star or by title, by pressing corresponding buttons or 'Enter' on corresponding field.

To see movie details, press on movie line in list.

You can delete movie by pressing corresponding 'Delete film' button in movie line.

You can add single movie by filling form (button 'Add movie'), or multiple movies provided in txt file.
For second option, press "Pick movies file", choose your file, then press 'Upload'.
