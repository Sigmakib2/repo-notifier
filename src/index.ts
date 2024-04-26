import { Hono } from 'hono';

const app = new Hono();

app.post('/:hookid/:extra', async (c) => {
   const section1 = c.req.param('hookid');
   const section2 = c.req.param('extra');
   const body = await c.req.json();

   // Construct the Discord webhook URL
   const webhookURL = `https://discord.com/api/webhooks/${section1}/${section2}`;

   // Extract relevant information from the GitHub webhook payload
   const repoName = body.repository.name;
   const fullName = body.repository.full_name;
   const repoURL = body.repository.html_url;
   const branch = body.ref.split('/').pop(); // Extract branch name from ref
   const commitMessage = body.head_commit.message;

   const messageParts = commitMessage.split('\n\n');
   const commitTitle = messageParts[0];
   const commitDescription = messageParts[1] ? `(${messageParts[1]})` : '';
   const formattedCommitMessage = `${commitTitle} ${commitDescription}`;

   const commitID = body.head_commit.id;
   const commitUrl = body.head_commit.url;
   const senderName = body.sender.login;
   const senderAvatarUrl = body.sender.avatar_url;
   const commitsCount = body.commits.length;

   const repoDescription = body.repository.description;
   const forksCount = body.repository.forks_count;
   const watchersCount = body.repository.watchers_count;
   const openIssuesCount = body.repository.open_issues_count;
   const commitTimestamp = body.head_commit.timestamp;
   const commitAuthor = body.head_commit.author.name;
   const commitusername= body.head_commit.author.username
   const commitCommitter = body.head_commit.committer.name;
   const modifiedFiles = body.head_commit.modified;

   const pusherName = body.pusher.name;
   const pusherEmail = body.pusher.email;

   const senderAvatarURL = body.sender.avatar_url;
   const senderProfileURL = body.sender.html_url;


   // Construct the markdown message
   const messageContent = `
## 📢 A new commit has been pushed to **[${repoName}](${repoURL})** on branch **${branch}**
- **Commit: **[${formattedCommitMessage}](${commitUrl})
- **Author: **[${commitAuthor}](https://github.com/${commitusername})
- **Modified: **${modifiedFiles}
- **Timestamp: **${commitTimestamp}
\n

`;

   // Use the GitHub webhook payload as the message content
   const message = {
      username: repoName + " Updates",
      "avatar_url": senderAvatarURL,
      content: messageContent,
      "embeds": [{
         "image": {
           "url": `https://opengraph.githubassets.com/${commitID}/${fullName}/commit/${commitID}`
         },
         "footer": {
            "text": "✔ Sended using - github.com/Sigmakib2/repo-notifier",
            
            "url": "https://example.com/more-info"
          },
          "description": `🔧 Commit ID: ${commitID}`
       }]
   };

   const response = await fetch(webhookURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
   });

   if (!response.ok) {
      return c.json({ message: `Failed to send data: ${response.statusText}` }, { status: response.status });
   }

   return c.json(body);
});

export default app;
