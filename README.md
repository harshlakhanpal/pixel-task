# pixel-task

GraphQL task for Pixel

## Requirements Met

- Store dog data.

- Set up a query to find a dog by name and/or breed.

- Set up a mutation to update a dog’s name using its ID.

- Upload your work to a public Git repository and share the clone URL (requires user action).

- Include a basic README with instructions for running the project locally.

## Features

- Store dog data.

- Query dogs by name and/or breed.

- Update a dog's name by ID.

## Setup

### Prerequisites

- Node.js

- npm or Yarn

- MongoDB (running locally or accessible)

### Installation

1. Clone the repository:

```bash

git clone git@github.com:harshlakhanpal/pixel-task.git

cd pixel-task

```

2. Install dependencies:

```bash

npm install

```

3. Create a `.env` file with:

```

MONGO_URI=<YOUR MONGO URI>

PORT=<YOUR PREFERRED PORT>

```

## Running the Application

- **Development (with auto-restart):**

```bash

npm run dev

```

- **Run Once:**

```bash

npm run build

npm start

```

## API Access

Once the server is running(look at the terminal for related logs), access the GraphQL Playground at: [https://studio.apollographql.com/sandbox/explorer](https://studio.apollographql.com/sandbox/explorer)
and then enter the server url towards the Top-Left of your screen.
