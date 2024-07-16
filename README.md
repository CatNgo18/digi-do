# Digi-Do (WIP)

- Feed your virtual pet by completing your to do list
- Created for LegalMation's Code Challenge
#### [How to Run](#how-to-run)

#### [Code Challenge Requirements](#code-challenge-requirements)

#### [Tutorial](#tutorial)
- [Glossary](#glossary)
- [Walkthrough](#walkthrough)

#### [Database](#database)
- [Schemas](#schemas)
- [Tables](#tables)

#### [Endpoints](#endpoints)
- Users:
  - [GET: User Get By User Id](#user-get-by-user-id)
  - [GET: User List Pets](#user-list-pets)
  - [POST: User Create Pet](#user-create-pet)
  - [GET: User Get Garden](#user-get-garden)
- Pets:
  - [GET: Pet Get By Pet Id](#pet-get-by-pet-id)
  - [GET: Pet List Tasks](#pet-list-tasks)
  - [POST: Pet Create Task](#pet-create-task)
  - [PUT: Pet Update](#pet-update)
  - [PUT: Pet Release Into Garden](#pet-release-into-garden)
  - [DELETE: Pet Delete](#pet-delete)
  - [POST: Pet Delete Multiple](#pet-delete-multiple)
- Tasks:
  - [GET: Task Get By Task Id](#task-get-by-task-id)
  - [PUT: Task Update](#task-update)
  - [PUT: Task Complete](#task-complete)
  - [PUT: Task Uncomplete](#task-uncomplete)
  - [DELETE: Task Delete](#task-delete)

#### [Upcoming Features](#upcoming-features)

## How to Run
1. Open Terminal
2. Navigate to ```digi-do``` folder
3. Run ```npm i```
4. Run ```npm run build```
5. Run ```npm run dev```

## Code Challenge Requirements
1. User can view a list of resources
```
- User can view list of pets
- User can view list of tasks
```
2. User can filter the list of resources by at least one attribute
```
- User can filter pets by:
  - name/title/description containing string
  - garden/active (not in garden)
  - happy/unhappy
- User can filter tasks by:
  - complete/incomplete
  - due date
```
3. User can click a resource in the list to view the resource details
```
- User can click on a pet to view pet details
- User can click on a task to view task details
```
4. User can create a new resource
```
- User can create pets
- User can create tasks
```
5. User can modify the resource details
```
- User can modify pet name, title, and description
- User can modify task title, description, and due date
```
6. User can delete the resource
```
- User can delete pets
- User can delete tasks
```

## Tutorial

### Glossary

<table>
  <tbody>
    <tr></tr>
    <tr>
      <th align="left" width="175">Word</th>
      <th align="left" width="175">Description</th>
    </tr>
    <tr>
      <td>Evolve (Upcoming)</td>
      <td>
      - If a pet is happy, the pet will evolve into the next life stage </br>
      - If a pet is unhappy, the pet will not evolve, but will try again the next day </br>
      </td>
    </tr>
    <tr>
      <td>Garden</td>
      <td>
      - Pets released here cannot be edited (cannot edit name or details, cannot perform any task actions) </br>
      - You can view the details of pets that have been released into the garden </br>
      - Serves as a collection of past completed projects </br>
      - You can release individual or multiple garden pets into the wild </br>
      </td>
    </tr>
    <tr>
      <td>Happiness Points (HP)</td>
      <td>
      - Pets with >= 1 HP are considered "happy" </br>
      - Pets with 0 HP are considered "unhappy"</br>
      - 0 <= HP <= 10</br>
      - Each completed task raises HP by 1</br>
      - If the due date passes and a task isn't complete, HP decreases by 1</br>
      </td>
    </tr>
    <tr>
      <td>Life Stage (Upcoming)</td>
      <td>
      - There are 4 life stages: baby, child, teen, and adult</br>
      - 3 days after beginning a new life stage, a pet will try to evolve</br>
      </td>
    </tr>
    <tr>
      <td>Pets</td>
      <td>
      - Represents a project or a task category</br>
      </td>
    </tr>
    <tr>
      <td>Release</td>
      <td>
      - When you're done with a project, you can release the pet into the garden or into the wild (NOTE: I do not condone releasing real pets into the wild)</br>
      </td>
    </tr>
    <tr>
      <td>Species (Upcoming)</td>
      <td>
      - When your pet evolves, they will change into a species associated with the life stage they're evolving into</br>
      - What species your pet evolves into depends on how many tasks you've completed and your pet's happiness</br>
      </td>
    </tr>
    <tr>
      <td>Tasks (Upcoming)</td>
      <td>
      - Categorize tasks by assigning them to different pets</br>
      </td>
    </tr>
    <tr>
      <td>Wild</td>
      <td>
      - Pets released into the wild are deleted from the database and cannot be recovered</br>
      </td>
    </tr>
  </tbody>
</table>

## Database

### Schemas

<table>
  <thead>
    <tr>
      <th align="left" width="1100">🗄 digi_do</th>
    </tr>
  </thead>
</table>

### Tables

<table>
  <thead>
    <tr>
      <th colspan="3" align="left" width="1100">💾 digi_do.user</th>
    </tr>
  </thead>
  <tbody>
    <tr></tr>
    <tr>
      <th align="left" width="175">Column Name</th>
      <th align="left" width="175">Type</th>
      <th align="left">Attributes</th>
    </tr>
    <tr>
      <td>id</td>
      <td><code>INT</code></td>
      <td><code>NOT NULL</code> <code>PRIMARY KEY</code> <code>AUTO_INCREMENT</code></td>
    </tr>
    <tr></tr>
    <tr>
      <td>name</td>
      <td><code>VARCHAR(128)</code></td>
      <td><code>NOT NULL</code></td>
    </tr>
  </tbody>
</table>

<table>
  <thead>
    <tr>
      <th colspan="3" align="left" width="1100">💾 digi_do.pet</th>
    </tr>
  </thead>
  <tbody>
    <tr></tr>
    <tr>
      <th align="left" width="175">Column Name</th>
      <th align="left" width="175">Type</th>
      <th align="left">Attributes</th>
    </tr>
    <tr>
      <td>id</td>
      <td><code>INT</code></td>
      <td><code>NOT NULL</code> <code>PRIMARY KEY</code> <code>AUTO_INCREMENT</code></td>
    </tr>
    <tr></tr>
    <tr>
      <td>user_id</td>
      <td><code>INT</code></td>
      <td><code>NOT NULL</code></td>
    </tr>
    <tr></tr>
    <tr>
      <td>name</td>
      <td><code>VARCHAR(128)</code></td>
      <td></td>
    </tr>
    <tr></tr>
    <tr>
      <td>title</td>
      <td><code>VARCHAR(128)</code></td>
      <td><code>NOT NULL</code></td>
    </tr>
    <tr></tr>
    <tr>
      <td>description</td>
      <td><code>VARCHAR(256)</code></td>
      <td></td>
    </tr>
    <tr></tr>
    <tr>
      <td>hp</td>
      <td><code>INT</code></td>
      <td><code>NOT NULL</code> <code>DEFAULT 0</code></td>
    </tr>
    <tr></tr>
    <tr>
      <td>evolve_day (Upcoming)</td>
      <td><code>DATE</code></td>
      <td><code>NOT NULL</code></td>
    </tr>
    <tr></tr>
    <tr>
      <td>life_stage_id (Upcoming)</td>
      <td><code>INT</code></td>
      <td><code>NOT NULL</code> <code>DEFAULT 0</code></td>
    </tr>
    <tr></tr>
    <tr>
      <td>species_id (Upcoming)</td>
      <td><code>INT</code></td>
      <td><code>NOT NULL</code></td>
    </tr>
    <tr></tr>
    <tr>
      <td>retro</td>
      <td><code>VARCHAR(256)</code></td>
      <td></td>
    </tr>
    <tr></tr>
    <tr>
      <td>garden</td>
      <td><code>BOOLEAN</code></td>
      <td><code>NOT NULL</code> <code>DEFAULT FALSE</code><td>
    </tr>
    <tr>
      <th colspan="3" align="left">Constraints</th>
    </tr>
    <tr>
      <td colspan="3" align="left">
        <code>CHECK</code>
        <code>(hp BETWEEN 0 AND 10)</code>
      </td>
    </tr>
    <tr></tr>
    <tr>
      <td colspan="3" align="left">
        <code>FOREIGN KEY</code>
        <code>(user_id)</code>
        <code>REFERENCES</code>
        <code>digi_do.user (id)</code>
        <code>ON UPDATE CASCADE</code>
        <code>ON DELETE CASCADE</code>
      </td>
    </tr>
    <tr></tr>
    <tr>
      <td colspan="3" align="left">
        <code>FOREIGN KEY</code>
        <code>(life_stage_id)</code>
        <code>REFERENCES</code>
        <code>digi_do.life_stage (id)</code>
        <code>ON UPDATE CASCADE</code>
        <code>ON DELETE CASCADE</code>
      </td>
    </tr>
    <tr></tr>
    <tr>
      <td colspan="3" align="left">
        <code>FOREIGN KEY</code>
        <code>(species_id)</code>
        <code>REFERENCES</code>
        <code>digi_do.species (id)</code>
        <code>ON UPDATE CASCADE</code>
        <code>ON DELETE CASCADE</code>
      </td>
    </tr>
  </tbody>
</table>

<table>
  <thead>
    <tr>
      <th colspan="3" align="left" width="1100">💾 digi_do.species (Upcoming)</th>
    </tr>
  </thead>
  <tbody>
    <tr></tr>
    <tr>
      <th align="left" width="175">Column Name</th>
      <th align="left" width="175">Type</th>
      <th align="left">Attributes</th>
    </tr>
    <tr>
      <td>id</td>
      <td><code>INT</code></td>
      <td><code>NOT NULL</code> <code>PRIMARY KEY</code> <code>AUTO_INCREMENT</code></td>
    </tr>
    <tr></tr>
    <tr>
      <td>name</td>
      <td><code>VARCHAR(64)</code></td>
      <td><code>NOT NULL</code></td>
    </tr>
    <tr></tr>
    <tr>
      <td>life_stage_id</td>
      <td><code>INT</code></td>
      <td><code>NOT NULL</code></td>
    </tr>
    <tr></tr>
    <tr>
      <td>hp</td>
      <td><code>INT</code></td>
      <td><code>NOT NULL</code></td>
    </tr>
    <tr></tr>
    <tr>
      <td>tasks</td>
      <td><code>INT</code></td>
      <td><code>NOT NULL</code></td>
    </tr>
    <tr></tr>
    <tr>
      <td>image</td>
      <td><code>VARBINARY</code></td>
      <td><code>NOT NULL</code></td>
    </tr>
    <tr>
      <th colspan="3" align="left">Constraints</th>
    </tr>
    <tr>
      <td colspan="3" align="left">
        <code>FOREIGN KEY</code>
        <code>(life_stage_id)</code>
        <code>REFERENCES</code>
        <code>digi_do.life_stage (id)</code>
        <code>ON UPDATE CASCADE</code>
        <code>ON DELETE CASCADE</code>
      </td>
    </tr>
  </tbody>
</table>

<table>
  <thead>
    <tr>
      <th colspan="3" align="left" width="1100">💾 digi_do.life_stage (Upcoming)</th>
    </tr>
  </thead>
  <tbody>
    <tr></tr>
    <tr>
      <th align="left" width="175">Column Name</th>
      <th align="left" width="175">Type</th>
      <th align="left">Attributes</th>
    </tr>
    <tr>
      <td>id</td>
      <td><code>INT</code></td>
      <td><code>NOT NULL</code> <code>PRIMARY KEY</code> <code>AUTO_INCREMENT</code></td>
    </tr>
    <tr></tr>
    <tr>
      <td>name</td>
      <td><code>VARCHAR(64)</code></td>
      <td><code>NOT NULL</code></td>
    </tr>
  </tbody>
</table>

<table>
  <thead>
    <tr>
      <th colspan="3" align="left" width="1100">💾 digi_do.task (Upcoming)</th>
    </tr>
  </thead>
  <tbody>
    <tr></tr>
    <tr>
      <th align="left" width="175">Column Name</th>
      <th align="left" width="175">Type</th>
      <th align="left">Attributes</th>
    </tr>
    <tr>
      <td>id</td>
      <td><code>INT</code></td>
      <td><code>NOT NULL</code> <code>PRIMARY KEY</code> <code>AUTO_INCREMENT</code></td>
    </tr>
    <tr></tr>
    <tr>
      <td>pet_id</td>
      <td><code>INT</code></td>
      <td><code>NOT NULL</code></td>
    </tr>
    <tr></tr>
    <tr>
      <td>title</td>
      <td><code>VARCHAR(128)</code></td>
      <td><code>NOT NULL</code></td>
    </tr>
    <tr></tr>
    <tr>
      <td>description</td>
      <td><code>VARCHAR(256)</code></td>
      <td></td>
    </tr>
    <tr></tr>
    <tr>
      <td>due_date</td>
      <td><code>DATETIME</code></td>
      <td></td>
    </tr>
    <tr></tr>
    <tr>
      <td>status</td>
      <td><code>ENUM('complete', 'incomplete')</code></td>
      <td><code>NOT NULL</code> <code>DEFAULT 'incomplete'</code></td>
    </tr>
    <tr>
      <th colspan="3" align="left">Constraints</th>
    </tr>
    <tr>
      <td colspan="3" align="left">
        <code>FOREIGN KEY</code>
        <code>(pet_id)</code>
        <code>REFERENCES</code>
        <code>digi_do.pet (id)</code>
        <code>ON UPDATE CASCADE</code>
        <code>ON DELETE CASCADE</code>
      </td>
    </tr>
  </tbody>
</table>

## Endpoints

### Users
#### User Get By User Id
Given a <code>userID</code>, return a user with detailed information.
##### Path
```http
GET /users/{userId}
```
##### API
<table>
  <tbody>
    <tr>
      <th colspan="3" align="left">🔖&nbsp;&nbsp;Path</th>
    </tr>
    <tr></tr>
    <tr>
      <th align="left">Name</th>
      <th align="left">Type</th>
      <th align="left">Description</th>
    </tr>
    <tr>
      <td>userId</td>
      <td><code>Long</code></td>
      <td>User ID for users to search</td>
    </tr>
  </tbody>
</table>

#### User List Pets
Given a <code>userID</code>, return a list of pets (and their non-detailed information) belonging to that user.
##### Path
```http
GET /users/{userId}/pets
```
##### API
<table>
  <tbody>
    <tr>
      <th colspan="3" align="left">🔖&nbsp;&nbsp;Path</th>
    </tr>
    <tr></tr>
    <tr>
      <th align="left">Name</th>
      <th align="left">Type</th>
      <th align="left">Description</th>
    </tr>
    <tr>
      <td>userId</td>
      <td><code>Long</code></td>
      <td>User ID for pets to search</td>
    </tr>
  </tbody>
</table>

#### User Create Pet
Given a <code>userId</code>, create a pet belonging to that user.
##### Path
```http
POST /users/{userId}/pets
```
##### API
<table>
  <tbody>
    <tr>
      <th colspan="3" align="left">🔖&nbsp;&nbsp;Path</th>
    </tr>
    <tr></tr>
    <tr>
      <th align="left">Name</th>
      <th align="left">Type</th>
      <th align="left">Description</th>
    </tr>
    <tr>
      <td>userId</td>
      <td><code>Long</code></td>
      <td>User ID to create a pet for</td>
    </tr>
    <tr><td colspan="3" ></td></tr>
    <tr></tr>
        <tr>
      <th colspan="3" align="left" width="1100">📥&nbsp;&nbsp;Request</th>
    </tr>
    <tr></tr>
    <tr>
      <th colspan="2" align="left">Model </th>
      <th align="left">Example </th>
    </tr>
    <tr>
      <td colspan="2" align="left"><pre lang="yml">
name: String
title: String</pre></td>
      <td align="left"><pre lang="json">
{
    "name": "Rocky",
    "title": "CS 121 Project"
    "description": "My project"
}
</pre></td>
    <tr>
      <th align="left">Key</th>
      <th align="left">Required</th>
      <th align="left">Description </th>
    </tr>
    <tr>
      <td><code>name</code></td><td><code>No</code></td><td>Name for pet</td>
    </tr>
    <tr></tr>
    <tr>
      <td><code>title</code></td><td><code>No</code></td><td>Title for project the pet represents</td>
    </tr>
    <tr></tr>
    <tr>
      <td><code>description</code></td><td><code>No</code></td><td>Description for project the pet represents</td>
    </tr>
  </tbody>
</table>

### Pets

#### Pet Get By Pet Id
Given a <code>petID</code>, return a pet with detailed information.
##### Path
```http
GET /pets/{petId}
```
##### API

#### Pet List Tasks
Given a <code>petID</code>, return a list of tasks (and their non-detailed information) belonging to that pet.
##### Path
```http
GET /pets/{petId}/tasks
```
##### API

#### Pet Create Task
Given a <code>petId</code>, create a task belonging to that pet.
##### Path
```http
POST /pets/{petId}/tasks
```
##### API

#### Pet Update
Given a <code>petId</code>, update the pet's information.
##### Path
```http
PUT /pets/{petId}
```
##### API

#### Pet Delete
Given a <code>petId</code>, delete the pet from the <code>digi_do.pets</code> table.
##### Path
```http
DELETE /pets/{petId}
```
##### API

#### Pet Delete Multiple
Given their <code>petId</code>s, delete multiple pets from the <code>digi_do.pets</code> table.
##### Path
```http
DELETE /pets
```
##### API

### Tasks

#### Task Get By Task Id
Given a <code>taskId</code>, return a task with detailed information.
##### Path
```http
GET /tasks/{taskId}
```
##### API

#### Task Update
Given a <code>taskId</code>, update the task's information.
##### Path
```http
PUT /tasks/{taskId}
```
##### API

#### Task Delete
Given a <code>taskId</code>, delete the task from the <code>digi_do.tasks</code> table.
##### Path
```http
DELETE /tasks/{taskId}
```
##### API

## Upcoming Features
- Tasks
- Evolution
- User Authentication