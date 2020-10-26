describe("TaskScheduler", () => {
  describe("when instantiated", () => {
    describe("when not passed startingTasks", () => {
      it("should not schedule any tasks", () => {
        // todo
      });

      it("should not create any lanes", () => {
        // todo
      });
    });

    describe("when passed startingTasks", () => {
      it("should schedule all the startingTasks", () => {
        // todo
      });

      it("should create the correct amount of lanes", () => {
        // todo
      });

      it("each lane should have the correct nextFreeSlot", () => {
        // todo
      });
    });
  });

  describe(".add()", () => {
    it("should return a new task", () => {
      // todo
    });

    it("should assign the task a unique id", () => {
      // todo
    });

    it("should schedule the new task", () => {
      // todo
    });

    it("should update every task's sortIndex", () => {
      // todo
    });

    describe("when it cant fit into one of the existing lanes", () => {
      it("should create a new lane", () => {
        // todo
      });
    });

    describe("when it can fit into any of the existing lanes", () => {
      it("should not create a new lane", () => {
        // todo
      });
    });

    it("should update every task's laneIndex", () => {
      // todo
    });

    it("should update every lane's nextFreeSlot", () => {
      // todo
    });
  });

  describe(".tasks (getter)", () => {
    it("should return a copy of the sortedList items", () => {
      // todo
    });
  });

  describe(".laneCount (getter)", () => {
    it("should return the number of lanes", () => {
      // todo
    });
  });

  describe(".lanes (getter)", () => {
    it("should return a copy of the lanes", () => {
      // todo
    });
  });

  describe(".remove()", () => {
    it("should remove the task with the given id from its tasks", () => {
      // todo
    });

    it("should update the remaining tasks' sortIndex", () => {
      // todo
    });

    describe("when removing it would result in empty lane(s)", () => {
      it("should remove all empty lanes", () => {
        // todo
      });
    });

    describe("when removing it would not result in empty lane(s)", () => {
      it("should not remove any lanes", () => {
        // todo
      });
    });

    it("should update the remaining tasks' laneIndex", () => {
      // todo
    });

    it("should update every lane's nextFreeSlot", () => {
      // todo
    });
  });

  describe(".modify()", () => {
    it("should remove the task of the given id", () => {
      // todo
    });

    // maybe this isn't ideal, since it would cause the event to have a new id
    it("should add a new task with the updated properties", () => {
      // todo
    });
  });
});
