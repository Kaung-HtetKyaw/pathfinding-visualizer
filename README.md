# Pathfinding Visualizer

I built this visualizer because i was inspired by Clement Mihailescu's [The Projects that got me into google video](https://youtu.be/n4t_-NjY_Sg) and I always wanted to implement algorithms and data structures into real life projects.

> Binary Heap is used as a Priority Queue for Dijkstra, A\* and Greedy Best First Search.

## The Algorithms

**Dijkstra** Algorithm (weighted): the father of path-finding algorithms and guarantees the shortest path.

**A Star** Search (weighted): arguably the best path-finding algorithm. It combines the pieces of information that Dijkstra’s Algorithm uses (favoring vertices that are close to the starting point) and heuristics(estimated distance from the node's current positon to goal). It is faster than Dijkstra and guarantees shortest path.

**Breadth First Search** (unweighted): a graph traversal algorithm that starts traversing the graph from root node and explores all the neighbouring nodes. It is slower than both Dijkstra and A\* but guarantees shortest path.

**Greedy Best First Search** (weighted): is like A* but it only uses heuristics to search to find the goal. It is faster than A*, Dijkstra, Breadth First Search but does not guarantee shortest path.

**Depth First Search** (unweighted): starts at the root node (selecting some arbitrary node as the root node in the case of a graph) and explores as far as possible along each branch before backtracking. It is slower than all of the above algorithms and does not guarantee shortest path.

## How to add walls and weights

Click on the grid to add a wall. Click on the grid while pressing W to add a weight.
You can also generate maze and pattern by selecting from the dropdown and click generate Generate Maze button.
Walls are impenetrable, meaning that a path cannot cross through them. Weights, however, are not impassable. They are simply more "costly" to move through. In this application, moving through a weight node has a "cost" of 15.

## How to relocate start and end nodes

Just simply click on start or end node and the mouse pointer will change to the icon of node you clicked on (start or end) and then just simpley click on the node you want start/end node to be at.
If the grid is dirty ,i.e. there was a previous visualization, relocating start/end node will re-visualize the selected pathfinding algorithm.

If anyone reading this knows of anything that could make it better, please let me know.

---

The following section is automatically created by CRA(create react app).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
