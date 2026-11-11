# LostLink



**Course:** Electronic Business Development (BINF 503) · Winter 2026
**Instructor:** Dr. Nourhan Hamdi
**Teaching Assistants:** Mr. Nour Gaser, Mr. Omar Alaa, Ms. Mariam Khalid, Mr. Younes Zied, Mr. Mahmoud Hani

## 1. Team

| Name | Student ID | Tutorial group | GitHub username |
|---|---|---|---|
| Mariam Sherif | 16006533 | T2 | mariaamsherif |
| Nour El Bably | 16002963 | T2 | nourelbably |
| Sama Omar | 16003067 | T2 | samaomaar23-web |
| Yassin Wael | 16007988 | T2 | dodogomma2024-glitch |
| Abdallah Elashry | 16002615 | T2 | dadahanyelashry-prog |
| Saad Aboshala | 16020507 | T2 | saed-2004 |


## 2. The idea



LostLink is a web-based platform that connects people who have lost belongings with individuals who find and report them, as well as official Lost & Found departments in locations such as malls, airports, hotels and restaurants. The platform allows users to report lost or found items, identifies possible matches between reports based on details such as descriptions, categories and locations, and helps the involved parties communicate and arrange the recovery of belongings. Its goal is to simplify the lost-and-found process, improve the chances of recovering belongings, and provide one centralized platform for managing lost and found items.

## 3. Features

### 3.1 The full product


- User registration and login with different account roles.
- Create lost and found item reports, including item descriptions, categories, locations, dates and photos.
- View, edit and delete submitted item reports.
- Automatically compare lost and found reports based on item descriptions, categories, locations and dates to identify potential matches.
- Display suggested matches with the relevant lost and found item details.
- Allow users to review, accept or reject suggested matches.
- Enable users to send and receive messages regarding potential matches.
- Allow users to submit ownership claims and provide descriptions of proof.
- Enable official Lost & Found departments to review ownership claims and approve or reject them.
- Update item statuses to indicate when items have been matched or recovered.
- Send notifications about potential matches and updates to reports and ownership claims.
- Provide administrators with tools to manage users, item reports and inappropriate content.

### 3.2 The use cases we will build



| # | Use case | What the user does | What they see | What is stored |
|---|---|---|---|---|
| 1 | Registration and login | Registers with name, email and password; logs in with email and password | Their home page, with their name in the header | A User, with the password hashed |
| 2 | Submit an item report | Selects lost or found and submits the item's title, description, category, location, date and optional photo | A confirmation message and the submitted report in their profile | An ItemReport containing the item details, report type, status and user ID |
| 3 | Manage item reports | Views their reports and chooses to edit, update the status of or delete a report | Their updated report list and a confirmation of the action | An ItemReport that is retrieved, updated or deleted |
| 4 | Review potential matches | Opens suggested matches and accepts or rejects a potential match between a lost and found item | Suggested lost and found reports with their details and match status | A Match linking the lost and found reports, with its status |
| 5 | Send and receive messages | Selects a potential match and sends a message to the other user involved | The conversation and received replies | A Message containing the content, sender ID, receiver ID, related match ID and timestamp |
| 6 | Verify claims and manage recovery | An official department representative reviews ownership claims and approves or rejects them; users can withdraw pending claims | A dashboard of pending claims for representatives and claim status for users | A Claim containing the item report, claimant, department representative, proof description and status |
## 4. Who owns what


| Member | Use case |
|---|---|
| Yassin Wael | 1. Registration and login |
| Nour El Bably | 2. Submit an item report |
| Sama Omar | 3. Manage item reports |
| Mariam Sherif | 4. Review potential matches |
| Abdallah Elashry | 5. Send and receive messages |
| Saad Aboshala | 6. Verify claims and manage recovery |

## 5. Data model



### User

```js
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // stored hashed, never as plain text
  role: {
    type: String,
    enum: ["user", "department", "admin"],
    default: "user"
  }
});
```

### ItemReport

```js
const itemReportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  reportType: {
    type: String,
    enum: ["lost", "found"],
    required: true
  },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  photo: { type: String },
  status: {
    type: String,
    enum: ["active", "matched", "recovered"],
    default: "active"
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});
```

### Match

```js
const matchSchema = new mongoose.Schema({
  lostItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ItemReport",
    required: true
  },
  foundItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ItemReport",
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending"
  }
});
```

### Message

```js
const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  match: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match",
    required: true
  },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
```

### Claim

```js
const claimSchema = new mongoose.Schema({
  itemReport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ItemReport",
    required: true
  },
  claimant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  departmentRepresentative: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  proofDescription: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }
});
```

## 6. Run it locally

> Leave this section as it is until Submission 2 (Thursday 10 December 2026,
> 23:59). Then fill it in: we follow these steps to run your project.

### Back end

```bash
cd backend
npm install
# create backend/.env from backend/.env.example (see the table below)
npm start
```

The API runs on http://localhost:3000.

| Variable in `.env` | What it is |
|---|---|
| `MONGODB_URI` | The connection string of your MongoDB Atlas database |
| `JWT_SECRET` | Any long random text, used to sign login tokens |
| [Any other variable] | [What it is] |

### Front end

```bash
cd frontend
npm install
npm run dev
```

The app runs on [the address `npm run dev` prints, e.g. http://localhost:5173].
