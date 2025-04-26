const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const users = [
  { email: "yash@example.com", password: "yash123" },
  { email: "inndhuja@example.com", password: "indhu123" },
  { email: "arshith@example.com", password: "arshit123" },
];
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Server is running!');
});
app.put('/users', (req, res) => {
  const { email, password } = req.body;
if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  const user = users.find(u => u.email === email);
  if (user) {
    user.password = password;
    return res.json({ message: "User password updated successfully" });
  } else {
    return res.status(404).json({ message: "Email not found" });
  }
});
app.delete('/users', (req, res) => {
    const { email } = req.body;
  
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
  
    const index = users.findIndex(u => u.email === email);
  
    if (index !== -1) {
      users.splice(index, 1);
      return res.json({ message: "User deleted successfully" });
    } else {
      return res.status(404).json({ message: "Email not found" });
    }
  });
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });