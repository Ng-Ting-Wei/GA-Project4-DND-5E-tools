# GA-Project4

This app is a game called Dungeons and Dragons 5th Edition, or otherwise called D&D 5E. This app allows you to create your own characters using the basic rules of the game.

## Features

- Login & Registration
- Lovely cute pet dogs to adopt
- Feed, Train & Play with your furry companion!
- Daily tasks to accomplish with your wonderful furriend based on your goals for this app!
- Adopt more dogs as you increase your closeness and relationship with your furkids!

## Screenshots

This image is the login with a registration link that will bring you to the register page.
![Login Page](./image/Login.png)

This image is the registration page when you clicked on the registrations link. Here you can register by inputing your email, username, password and what role you want to take.
![Register Page](./image/Register.png)

This image is the main page of the player before adding any characters when you logged in. Your name will be shown on the top left of the page and you can create a character when you click on the create character button on the top right. You can also logout from your account when you click on the top right of the page and it will bring you to the login page.
![Player1 Page](./image/Player1.png)

This image is the main page of the player if you have any character when you logged in. Your name will be shown on the top left of the page and you can create a character when you click on the create character button on the top right. You can also logout from your account when you click on the top right of the page and it will bring you to the login page.
![Player2 Page](./image/Player2.png)

This image is after clicking on the adding character button. Here you will create your own character that you envision.
Here you will input your name for you character. Pick one of the basic races, classes and backgrounds. Your features you have to input yourself while refering to the books. The level you should be starting at level 1 or whatever your dm(Dungeon Master) says.
![Createcharacter1 Page](./image/Createcharacter1.png)

Here you will select only two savingthrows that your class gives you. If you select two, the check box will be disable and not allow you to add in more.
![Createcharacter2 Page](./image/Createcharacter2.png)

Here you will select your character skills from your class and background. There is no limit to your selection.
![Createcharacter3 Page](./image/Createcharacter3.png)

Here you will input your ability score for strength, dexterity, consitution, intelligence, wisdom and charisma. You will also input your maximum hitpoints and current hitpoints, both would be the same for the purpose of character creation.
![Createcharacter4 Page](./image/Createcharacter4.png)

Here you will input your armor class(AC) in numbers and input your inventory. The inventory you will take from your class and backgrounds. On the bottom of the character creation, there are two buttons. Create character will take what you input and create a character for you and will bring you to the character display page in which you will see your own created character. Go back to character will erase all your inputs and brings you to the character display page.
![Createcharacter5 Page](./image/Createcharacter5.png)

This image is after adding the character that you made.

## Technologies Used

- HTML
- CSS
- Javascript
- React
- MongoDB
- Express

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

[Frontend]

`VITE_SERVER`
`ACCESS_SECRET`
`REFRESH_SECRET`

[Backend]

`PORT`
`DATABASE`
`ACCESS_SECRET`
`REFRESH_SECRET`

## Learning Points

[Frontend]

- Fetch, useEffect, useState
- Component reuse
- API usage
- React

[Backend]

- Mongoose Schemas
- Routers
- Controllers
- Models
- Authentication

## Ice Box

- Images - Add character image. Currently, there are no image to show the user what that character looks like when you play as them.

- Details - Add details when you click on the abilities, classes, races, etc. There are no displayed informations for many abilities, classes, etc when you want to see which of your abilities do what.

- Spells - Add spells to spellcaster. There is no spells in the database and is important to all spellcasters. It will be added during the next update.

- Feats - Add feats to character. There is no feats in the database and is important to most characters. It will be added during the next update.
