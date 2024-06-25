# Simple-Facebook-App

A Facebook-like application built using Sequelize and Express to manage users, posts, and comments.

## Features

1. **Sequelize Model for Users**:
   - `username`
   - `email` (must be unique)
   - `password`

2. **Sequelize Model for Posts**:
   - `title`
   - `content`
   - `author` (linked to the User model)

3. **Sequelize Model for Comments**:
   - `content`
   - `postId` (linked to the Post model)
   - `userId` (linked to the User model)

4. **User Authentication**:
   - User registration
   - User login
   - User logout

5. **CRUD Operations for Posts**:
   - Create posts
   - Read posts
   - Update posts
   - Delete posts

6. **CRUD Operations for Comments**:
   - Create comments
   - Read comments
   - Update comments
   - Delete comments

7. **Post Ownership**:
   - Users can only edit or delete (soft delete) their own posts

8. **Password Security**:
   - Use bcrypt.js to hash and store user passwords securely

9. **Special Endpoints**:
   - Get a specific user with a specific post and the post’s comments
   - Get a specific post with the author
