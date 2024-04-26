# Repo-Notifier: Serverless GitHub Updates to Discord with Cloudflare Workers & Hono

Repo-Notifier is a serverless solution that bridges the gap between GitHub and Discord, providing a customizable and visually appealing way to receive notifications about GitHub events directly in your Discord channels. This project is designed to enhance the integration between GitHub and Discord, offering a more engaging and informative experience for developers and teams.

![discord announcement in a channel on change of github repository](https://raw.githubusercontent.com/Sigmakib2/repo-notifier/main/repo-notifier.png "github webhook information on discord using cloudflare workers and hono")

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your local machine.
- A Cloudflare account so that you can use the Cloudflare Workers.
- A Discord webhook URL for receiving submissions.

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Sigmakib2/repo-notifier.git
2. Install dependencies:

    ```sh
    npm install
3. Run Local server:
    ```sh
    npm run dev
### Configure with your webhook

You need to deploy this first to make sure it is working. To deploy this you have to run this command:

```sh
npm run deploy
```
Note: you need [Wrangler (command line)](https://developers.cloudflare.com/workers/wrangler/) for better development experience.

After successful deploy you will get a url like this: ```https://some-random-name.workers.your-username.workers.dev```

#### Create your webhook

Now you need to create your webhook endpoint. You need to have the discord webhook. Don't know how to get webhook url? Here is a doc for help:
https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks

So, dere is a demo Discord webhook url:

```sh
https://discord.com/api/webhooks/123.../abc...
```
Now you can create the webhook url for your GitHub. To do that you need:

```sh
/123.../abc...
```
this part from the Discord webhook url.

Now add this with your Cloudflare workers url like this:

```sh
https://some-random-name.workers.your-username.workers.dev/123.../abc...
```
Navigate to your GitHub repository's "Settings" > "Webhooks" section and add a new webhook. In the Payload URL section paste the above url.

Select Content type as **application/json** and select Send me everything option to get all info.

If everything is done then go to the code and push a new commit. You should get a Discord message in the channel.