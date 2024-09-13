const { ObjectId } = require("mongodb");

class ContactService {
  contructor(client) {
    this.Contact = client.db().collection("contact");
  }
  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  extractConactData(payload) {
    const contact = {
      name: payload.name,
      email: payload.email,
      address: payload.address,
      phone: payload.phone,
      favorite: payload.favorite,
    };
    // Remote undefined files
    Object.keys(contact).forEach(
      (key) => contact[key] === undefined && delete contact[key]
    );
    return contact;
  }
  async create(payload) {
    const contact = this.extractConactData(payload);
    const result = await this.Contact.findOneAndUpdate(
      contact,
      { $set: { favorite: contact.favorite === true } },
      { returnDocuent: "after", upsert: true }
    );
    return result;
  }
  async findById(id) {
    return await this.Contact.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractConactData(payload);
    const result = await this.Contact.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocuent: "after" }
    );
    return result.value; //return result;
  }

  async delete(id) {
    const result = await this.Contact.findOneAndDelete({
      _id: Object.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }

  async findAllFavorite() {
    return await this.find({ favorite: true });
  }

  async deleteAll() {
    const result = await this.Contact.deleteMany({});
    return result.deletedCount;
  }
}
module.exports = ContactService;
