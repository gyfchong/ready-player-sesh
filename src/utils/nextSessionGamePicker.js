export default (groupMembers, attendees) => {
  const newPlayerOrder = [...attendees];

  const absenteesIndexes = groupMembers.reduce((absentees, player, index) => {
    if (player.status === "absent") {
      absentees.push({ ...player, index });
    }

    return absentees;
  }, []);

  array_move(newPlayerOrder, 0, newPlayerOrder.length - 1);

  absenteesIndexes.forEach(({ index, ...absentee }) => {
    newPlayerOrder.splice(index, 0, absentee);
  });

  return newPlayerOrder;
};

const array_move = (arr, old_index, new_index) => {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing
};
