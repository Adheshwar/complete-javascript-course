const adhesh = {
  firstName: "Adheshwar",
  lastName: "S",
  chineseName: "陈逸凯",
  job: "ServiceNow Developer",
  employer: "Wipro Ltd",
  location: "Chennai",
  birthYear: 1995,
  calcAge: function () {
    return new Date().getFullYear() - this.birthYear;
  },
  friends: ["Aben Sabu", "Adi", "Deepan"],
  addSummary() {
    this.summary = `${this.firstName} is ${this.calcAge()} old, working as ${
      this.job
    } in ${this.employer} at ${this.location}. He has ${
      this.friends.length
    } friends and his Best friend is ${this.friends[0]}.`;
    return this.summary;
  },
};

const person = {
  firstName: "John",
  lastName: "Doe",
  id: 5566,
  fullName: function () {
    console.log("print " + JSON.stringify(this, null, 4));
    this.name = this.firstName + " " + this.lastName;
    return this.name;
  },
};
console.log(adhesh.addSummary());
console.log(person.fullName());
console.log(adhesh);
