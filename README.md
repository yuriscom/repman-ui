# Dr. Wilderman Patient Review Form

- Install the dependencies with `yarn install`
- Run the development server with `yarn start`, and then visit localhost:8080
- Build with `yarn build`
- Lint with `yarn lint`

Please check that `yarn build` and `yarn lint` are successful before committing changes!

### Pull Requests

For features and bug fixes create a new branch with a descriptive name, e.g. `feature/my_feature`. When opening a new pull request, make sure you point the base branch to `develop`.


### To run as a Docker container

0. Install docker using `brew install docker` or using the GUI and start docker using `docker start` or open the Docker application
1. Go inside the project directory.
2. Run: `docker build . -t speer/wilderman`
3. Run: `docker run -p *8000*:80 speer/wilderman` (8000 can be replaced with port number of your choice)
4. Application can now be tested on the browser on `localhost:PORT_NUMBER`
