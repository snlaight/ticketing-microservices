import mongoose from 'mongoose';
import { OrderStatus } from '@snltickets/common';
import { TicketDoc } from './ticket';

export { OrderStatus };

/**
 * An order object that contains the userId, status, expiresAt, ticket, and version.
 * @typedef {Object} OrderAttrs
 * @property {string} userId - The userId of the user who placed the order.
 * @property {OrderStatus} status - The status of the order.
 * @property {Date} expiresAt - The date that the order expires.
 * @property {TicketDoc} ticket - The ticket that the order is for.
 * @property {number} version - The version of the order.
 */
interface OrderAttrs {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketDoc;
}

/**
 * The Order model.
 * @param {string} userId - The user ID of the user who created the order.
 * @param {OrderStatus} status - The status of the order.
 * @param {Date} expiresAt - The date that the order expires.
 * @param {TicketDoc} ticket - The ticket that the order is for.
 * @param {number} version - The version of the order.
 * @returns None
 */
interface OrderDoc extends mongoose.Document {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketDoc;
  version: number;

  isExpired(): boolean;
}

/**
 * A mongoose model for the Order object.
 * @param {OrderAttrs} attrs - The attributes of the order object.
 * @returns {OrderDoc} - The mongoose document for the order object.
 */
interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

/**
 * The schema for the order object.
 * @property {string} url - The URL of the page that the filter is applied to.
 * @property {string} frameURL - the URL of the frame that the filter is applied to.
 * @property {string | undefined} fixes - The string of CSS fixes to apply to the page.
 * @property {FilterConfig} config - The filter configuration object.
 * @property {SitePropsIndex<InversionFix>} index - The index of the site properties.
 */
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus),
      default: OrderStatus.Created,
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket',
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

/**
 * A mongoose model for the Order collection.
 * @param {mongoose.Schema} schema - The mongoose schema for the Order collection.
 * @returns {mongoose.Model<OrderDoc, OrderModel>} - The mongoose model for the Order collection.
 */
const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };
