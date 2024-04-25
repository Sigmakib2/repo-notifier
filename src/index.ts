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
 const branch = body.ref.split('/').pop(); // Extract branch name from ref
 const commitMessage = body.head_commit.message;
 const commitUrl = body.head_commit.url;
 const senderName = body.sender.login;
 const senderAvatarUrl = body.sender.avatar_url;
 const commitsCount = body.commits.length;

 // Construct the markdown message
 const messageContent = `
**GitHub Webhook Notification**
A new commit has been pushed to **${repoName}** on branch **${branch}**
**Commit Message:** ${commitMessage}
**Commits:** ${commitsCount}
**Repository:** [${repoName}](https://github.com/Sigmakib2/test-embed)
**Sender:** ${senderName}
`;

 // Use the GitHub webhook payload as the message content
 const message = {
    content: messageContent,
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
