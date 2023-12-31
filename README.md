# Memory Threads

Deployed App: https://memory-threads.vercel.app/

## Milestone 4 Updates

- Added editing and deletion of the journal entries - AJAX
- Added styling to all the pages using CSS modules
- Added a second schema to store User Data
- Added the mechanism to filter journal entries by date
- Added second HOF to handle the filtering
- Increased stability and security by adding mongo-sanitize (protected routes were already implemented)

## Milestone 3 Updates

- Added a wide array of user authentication features along with protected routes
- Dedicated a lot of time to plan the theme and UI of the application and implemented the UI of the home page
- Implemented the basic functionality of the journal entry creation page and this time retrieved the journal entries from the database and appended it live to the page

## Screenshots for Testing

- [Form Submission Feedback](./documentation/form-submission-feedback.png)
- [Form Submission Post Payload](./documentation/form-submission-post-payload.png)
- [Database update screenshot](./documentation/database-update.png)

## Updated Idea - Final Pitch

## Overview

"Memory Threads" is a streamlined and efficient app designed for personal reflection and memory curation. Each user creates a journal entry daily, embedding their thoughts, experiences, and any media links that highlight the day's significance. These entries are organized in a chronological timeline, offering a quick glance at the journey from today's musings back to past reflections. The app includes practical features like edit and archive options, empowering users to update recent entries or store away memories they prefer to keep private. It's a digital journal that emphasizes personal growth and the preservation of memories in a user-friendly and accessible manner.

## Data Model

### User

Represents the individual users of the app, containing their authentication and personal profile information.

- `ID`: Unique identifier for the user.
- `Username`: The user's chosen username.
- `Email`: Email address of the user.
- `PasswordHash`: Hashed password for secure authentication.

### JournalEntry

Represents a single entry in the user's journal, documenting their daily experiences and thoughts.

- `ID`: Unique identifier for the entry.
- `UserID`: The ID of the user who created the entry.
- `Title`: A brief title for the journal entry.
- `Content`: The main content of the journal entry.
- `SpecialLink`: An optional link to external content that highlighted the user's day.
- `ImageURL`: An optional URL pointing to an image associated with the entry.
- `DateCreated`: The date and time when the journal entry was created.
- `LastUpdated`: The date and time when the journal entry was last updated.
- `IsArchived`: A boolean flag indicating whether the entry is archived.

## Database Schemas

The database schemas are defined using Mongoose and are structured to represent users, their friendship groups, newsletters, responses, and memories. The schemas are defined in [`models`](./memory-threads-app/models/) file.

# User Stories for Memory Threads App

- **Account Management**

  - As a new user, I want to sign up with a username and password so that I can create a personal account.
  - As a returning user, I want to log in with my username and password to access my entries.

- **Journal Entry Creation**

  - As a user, I want to create a new journal entry for each day to document my daily life.
  - As a user, I want to add a photo to my journal entry to keep a visual memory of the day.
  - As a user, I want to link external content, such as a song or an article, to my journal entry to remember what influenced me.

- **Journal Entry Management**

  - As a user, I want to view my journal entries in a timeline, sorted from newest to oldest, to easily navigate through my memories.
  - As a user, I want to edit my journal entries within 24 hours of posting them to update or correct information.
  - As a user, I want to archive journal entries that I prefer not to see in my timeline anymore but still want to keep.

- **Journal Entry Retrieval**
  - As a user, I want to search my entries by keywords so that I can find specific memories or topics quickly.

## Research Topics

This project will incorporate a range of modern development tools and practices to ensure a robust and maintainable codebase. The following is a list of research topics that have been explored, along with their assigned point values and the total points pursued for this project.

- (6 points) **Next.js with React**
  - Next.js is being utilized as the foundation of the front-end framework, leveraging its server-side rendering capabilities to improve performance and SEO.
- (3 points) **User Authentication with Clerk**
  - Integrating Passport for authentication middleware alongside Bcrypt for secure password hashing to facilitate robust user authentication measures.
- (3 points) **Configuration Management with dotenv**
  - Dotenv is used to manage environment variables, allowing the application to be configured without hard-coding sensitive data and making it easy to adapt to different environments (development, production, etc.).
- (2 points) **ESLint Integration**
  - ESLint has been integrated into the workflow to maintain code quality and consistency, with a configuration file included in the repository.
  - This setup will automatically lint all JavaScript files on save, outside of `node_modules`. A screen capture showing the linting in action will be included.
- (3 points) **Deployment Using Vercel**
  - The application is deployed using Vercel, which provides seamless deployment of Next.js applications with features like preview deployments for each push.
  - Links to the deployed application and the Vercel deployment configuration will be provided.

The total points for the chosen research topics sum up to **17 points**, ensuring a comprehensive exploration of a wide range of development practices.

## Previous Idea - Pitched in Milestone 1

## Overview

"Memory Threads" is a charming and heartfelt app designed to keep the magic of friendship alive, one shared story at a time. Imagine a cozy digital nook where friends come together to weave a beautiful monthly newsletter, filled with laughter, stories, and pictures that paint the picture of their current lives. Each edition is like a warm hug from the past, capturing the essence of friendship in heartfelt responses to prompts like "What made you smile this month?" or snapshots that say "Wish you were here!"

With a sprinkle of nostalgia, the app also offers a delightful timeline feature – a memory lane where friends can stroll down and revisit the newsletters of yesteryears, reliving memories and smiles. "Memory Threads" isn’t just an app; it’s a shared diary, a collection of moments, and a treasure trove of the silly, the significant, and everything in between. It’s where distance doesn’t dim the warmth of friendship, and time spent apart only makes the shared stories sweeter.

In a digital realm overflowing with fleeting likes and quick comments, "Memory Threads" offers a sanctuary for friends seeking a more profound connection. This app is a heartfelt answer to the shallow pools of social media, inviting friends to dive deeper than the occasional "hello" and the conversations that fade too quickly. It’s a dedicated space for those amazing, pure friendships that, though threatened by the drift of post-graduation life, are too precious to let slip away. "Memory Threads" nurtures these bonds by encouraging continuous, intimate sharing, allowing for a group's collective narrative to flourish even as new chapters unfold individually. It's where the essence of true friendship is not only preserved but celebrated and allowed to grow, undiminished by the miles or years that may separate us.

This project is inspired from [**Letterloop.**](https://letterloop.co/)

## Data Model

In "Memory Threads," the application's data architecture is designed to capture the essence of enduring friendships and shared histories. The relationships between the different data entities are as follows:

- `Users` form the core of the application, each with a unique profile.
- Each `User` can be part of one or many `FriendshipGroups`, which are clusters of users who participate in creating and sharing `Newsletters`.
- `FriendshipGroups` are responsible for the generation of `Newsletters` on a predetermined schedule (e.g., monthly).
- `Newsletters` consist of various `Prompts`, which are creative questions or conversation starters proposed by the users.
- Users respond to these `Prompts` with `Responses`, which can include textual stories, images, or any meaningful content.
- The `Responses` are then compiled to form the `Newsletter`, which is distributed among the members of the respective `FriendshipGroup`.
- `Timelines` represent a sequential collection of `Newsletters` and `Responses`, embodying the shared journey of the group.
- `Memories` are highlighted elements such as photos, videos, or text entries that users contribute, tied to a `Newsletter` but also kept separately for posterity and reflection.

Below are sample MongoDB document structures that illustrate how the data is organized:

### Example User Document

```javascript
{
  username: "foreverfriend",
  password: // a password hash,
  email: "friend@example.com",
  friendshipGroups: // an array of references to FriendshipGroup documents
}
```

### Example FriendshipGroup Document

```javascript
{
  groupName: "College Buddies",
  members: // an array of references to User documents,
  newsletters: // an array of references to Newsletter documents
}
```

### Example Newsletter Document

```JS
{
  friendshipGroup: // a reference to a FriendshipGroup document,
  issueDate: // timestamp of newsletter creation,
  prompts: [
    {
      promptText: "What’s a recent challenge you overcame?",
      responses: // an array of references to Response documents
    },
    {
      promptText: "Share a picture from a place you visited this month!",
      responses: // an array of references to Response documents
    },
  ],
  memories: // an array of references to Memory documents (pictures, videos, etc.)
}
```

### Example Response Document

```JS
{
  user: // a reference to a User document,
  prompt: // a reference to the Prompt it belongs to,
  content: "I finally finished my first marathon!",
  attachments: // an array of image/video URLs or document references,
  createdAt: // timestamp
}
```

### Example Memory Document

```JS
{
  user: // a reference to a User document,
  newsletter: // a reference to the Newsletter it is associated with,
  content: "Picture from our last day at the campus",
  url: // URL or a reference to the stored image/video,
  sharedAt: // timestamp
}

```

## Database Schemas

The database schemas are defined using Mongoose and are structured to represent users, their friendship groups, newsletters, responses, and memories. The schemas are defined in the [`db.mjs`](./db.mjs) file.

## Wireframes

/profile/create

[HTML Wireframe](./documentation/html-wireframes/profile-creation.html)

![Image](./documentation/wireframe-images/profile-creation.png)

/newsletter

[HTML Wireframe](./documentation/html-wireframes/newsletter.html)

![Image](./documentation/wireframe-images/newsletter.png)

/friendgroup

[HTML Wireframe](./documentation/html-wireframes/friendgroup.html)

![Image](./documentation/wireframe-images/friendgroup.png)

## Site map

This is the hierarchial sitemap of my website.

![Site Map](./documentation/wireframe-images/sitemap.png)

## User Stories

### Core User Stories

1. **As a user**, I want to create a personal profile, so that I can have a personalized experience and be identifiable by my friends within the app.
2. **As a user**, I want to join and form friendship groups, so that I can maintain a circle of friends to share newsletters with.
3. **As a member of a friendship group**, I want to contribute to a collaborative newsletter, so that I can share updates and stay connected with my friends.
4. **As a user**, I want to receive a recurring newsletter, so that I can see what's new with my friends and reminisce about past times.
5. **As a user**, I want to respond to prompts in the newsletter, so that I can share my thoughts, experiences, and memories with the group.
6. **As a user**, I want to be able to view past newsletters, so that I can revisit memories and stories shared by my friends over time.
7. **As a user**, I want to be able to submit photos, etc as 'Memories', so that they can be preserved and easily accessed in the future.
8. **As a user**, I want to have a timeline view of the memories and newsletters, so that I can experience the journey my friends and I have had over the years.
9. **As a user**, I want to receive notifications/reminders to contribute to the upcoming newsletter, so that I don't miss the chance to share and stay updated.
10. **As a user**, I want to be able to customize the prompts or questions for our newsletter, so that they can reflect the interests and needs of my friend group.

### Additional/Stretch User Stories

1. **As a user with many friend groups**, I want to easily switch between different group newsletters, so that I can manage multiple friend circles easily.
2. **As a user**, I want to export a newsletter to a PDF or print format, so that I can have a physical copy of our memories.
3. **As a user**, I want the ability to 'react' to friends' stories or photos, so that I can engage with the content they share.
4. **As a privacy-conscious user**, I want to control who sees my contributions, so that I can share sensitive updates confidently within my trusted circle.

## Research Topics

This project will incorporate a range of modern development tools and practices to ensure a robust and maintainable codebase. The following is a list of research topics that have been explored, along with their assigned point values and the total points pursued for this project.

- (6 points) **Next.js with React**
  - Next.js is being utilized as the foundation of the front-end framework, leveraging its server-side rendering capabilities to improve performance and SEO.
- (3 points) **User Authentication with Clerk OAuth**
  - Integrating Clerk Oauth built over JWT for secure password hashing to facilitate robust user authentication measures.
- (3 points) **Configuration Management with dotenv**
  - Dotenv is used to manage environment variables, allowing the application to be configured without hard-coding sensitive data and making it easy to adapt to different environments (development, production, etc.).
- (2 points) **ESLint Integration**
  - ESLint has been integrated into the workflow to maintain code quality and consistency, with a configuration file included in the repository.
  - This setup will automatically lint all JavaScript files on save, outside of `node_modules`. A screen capture showing the linting in action will be included.
- (3 points) **Deployment Using Vercel**
  - The application is deployed using Vercel, which provides seamless deployment of Next.js applications with features like preview deployments for each push.
  - Links to the deployed application and the Vercel deployment configuration will be provided.

The total points for the chosen research topics sum up to **17 points**, ensuring a comprehensive exploration of a wide range of development practices.

### [Main Project File](app.mjs)

## Annotations / References Used

1. [Next.js Documentation](https://nextjs.org/docs) - The primary resource for understanding Next.js features and best practices.
2. [Mocha Testing Framework](https://mochajs.org/) - Provided insights into writing and running tests for JavaScript.
3. [Chai Assertion Library](https://www.chaijs.com/) - Assisted in creating expressive assertions for tests, making them readable and maintainable.
4. [Dotenv: Environment Variables in Node.js](https://github.com/motdotla/dotenv) - Offered the methodology for managing environment variables securely.
5. [ESLint: Pluggable JavaScript Linter](https://eslint.org/) - Essential for maintaining code quality and style consistency.
6. [Tailwind CSS Documentation](https://tailwindcss.com/docs) - For utility-first styling principles and responsive design strategies.
7. [Vercel Deployment Documentation](https://vercel.com/docs) - Guidance on deploying applications effectively with Vercel.
8. [Passport.js Authentication Docs](http://www.passportjs.org/docs/) - The foundational guide for implementing user authentication in the project.
9. [bcrypt.js Documentation](https://github.com/kelektiv/node.bcrypt.js#readme) - Directions for hashing and securing user passwords.
10. [Tailwind CSS with React](https://tailwindcss.com/docs/guides/create-react-app) - Specifics on integrating Tailwind CSS with a React application.
