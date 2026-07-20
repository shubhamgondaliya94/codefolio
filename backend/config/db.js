const mongoose = require('mongoose');
const dns = require('dns');

// Force IPv4 DNS resolution first to prevent querySrv ECONNREFUSED errors for Atlas
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}

// Fallback to public DNS servers if node defaults to local loopback resolver (which often fails SRV lookups on Windows/some environments)
try {
  const currentServers = dns.getServers();
  if (currentServers.includes('127.0.0.1') || currentServers.includes('::1') || currentServers.length === 0) {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
  }
} catch (e) {
  console.warn('Unable to set fallback DNS servers:', e.message);
}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio_builder', {
      autoIndex: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
