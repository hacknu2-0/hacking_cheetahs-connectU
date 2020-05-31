class Product {
  constructor(id, ownerId, title, address, description, landmark,timetopickup,datetopickup,mobileno) {
    this.id = id;
    this.ownerId = ownerId;
    this.address = address;
    this.title = title;
    this.description = description;
    
    this.landmark=landmark
    this.timetopickup=timetopickup
    this.datetopickup=datetopickup
    this.mobileno=mobileno
    
    
    
  }
}

export default Product;
