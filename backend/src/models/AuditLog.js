const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: { type: String, required: true },
  entity: { type: String, required: true },
  entityId: { type: String, default: '' },
  timestamp: { type: Date, default: Date.now },
  details: { type: Object, default: {} },
}, { timestamps: true });

module.exports = mongoose.model('AuditLog', auditLogSchema);
