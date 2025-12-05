const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Tenant } = require("../models");

exports.registerTenant = async (req, res) => {
  try {
    const { name, email, password, shopDomain, accessToken } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const tenant = await Tenant.create({
      name,
      email,
      password: hashedPassword,
      shopDomain,
      accessToken
    });

    res.json({ message: "Tenant registered successfully", tenant });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.loginTenant = async (req, res) => {
  try {
    const { email, password } = req.body;
    const tenant = await Tenant.findOne({ where: { email } });

    if (!tenant) return res.status(404).json({ message: "Tenant not found" });

    const isMatch = await bcrypt.compare(password, tenant.password);

    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: tenant.id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    return res.json({
      token,
      name: tenant.name
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};


