const express = require("express");
const app = express();

app.use(express.json());

// In-memory database (just a list for demo)
let items = [
  { id: 1, name: "Notebook" },
  { id: 2, name: "Pen" },
];

/* ===========================================
   V1 — Original API (simple, stable contract)
   =========================================== */
app.get("/api/v1/items", (req, res) => {
  res.json(items);
});

app.get("/api/v1/items/:id", (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));

  if (!item) return res.status(404).json({ message: "Item not found" });

  res.json(item);
});

app.post("/api/v1/items", (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.delete("/api/v1/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  items = items.filter(item => item.id !== id);
  res.json({ message: "Item deleted" });
});

/* ====================================================
   V2 — Improved API (non-breaking, adds createdAt)
   ==================================================== */
app.get("/api/v2/items", (req, res) => {
  res.json(
    items.map(item => ({
      ...item,
      createdAt: new Date().toISOString()
    }))
  );
});

app.get("/api/v2/items/:id", (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ message: "Item not found" });

  res.json({
    ...item,
    createdAt: new Date().toISOString()
  });
});

app.post("/api/v2/items", (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name,
    createdAt: new Date().toISOString()
  };
  items.push(newItem);

  res.status(201).json(newItem);
});

// ✅ Run server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
