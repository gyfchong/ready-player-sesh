// @ts-nocheck
import { useEffect, useState } from "react";
import { format } from "date-fns";
import styled from "@emotion/styled";
import capitalize from "capitalize";
import { pl } from "date-fns/locale";

const sessions = [
  {
    date: new Date(2022, 6, 25),
    players: [
      { name: "Dayne", status: "undecided" },
      { name: "Simon.NET", status: "undecided" },
      { name: "Simon.JS", status: "undecided" },
      { name: "Drew", status: "undecided" },
      { name: "Geoff", status: "undecided" },
    ],
  },
  { date: new Date(2022, 6, 4), players: [] },
  { date: new Date(2022, 5, 7), players: [] },
  { date: new Date(2022, 4, 2), players: [] },
];

const findLastIndex = (array, predicate) => {
  let l = array.length;
  while (l--) {
    if (predicate(array[l], l, array)) return l;
  }
  return -1;
};

function array_move(arr, old_index, new_index) {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing
}

function App() {
  const [groupMembers, setGroupMembers] = useState([
    { name: "Dayne", status: "undecided" },
    { name: "Simon.NET", status: "undecided" },
    { name: "Simon.JS", status: "undecided" },
    { name: "Drew", status: "undecided" },
    { name: "Geoff", status: "undecided" },
  ]);

  const [picker, setPicker] = useState(-1);
  const [sessionPlayers, setSessionPlayers] = useState([]);

  const allPlayersVoted = groupMembers.every(
    (player) => player.status !== "undecided"
  );

  const enoughAttendees = sessionPlayers.length >= 3;

  const setGamePicker = () => {
    const newPickerIndex = groupMembers.findIndex(
      (seshPlayer) => seshPlayer.status === "going"
    );

    setPicker(newPickerIndex);
  };

  const nextPlayerOrder = () => {
    const newPlayerOrder = [...sessionPlayers];

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

  const handleStatusChange = (playerIndex, status) => () => {
    const updatedPlayers = groupMembers.map((player, index) => {
      const updatedPlayer = { ...player };

      // Update the current player's status
      if (playerIndex === index) {
        updatedPlayer.status = status;
        return updatedPlayer;
      }

      return player;
    });

    setGroupMembers(updatedPlayers);
  };

  useEffect(() => {
    setGamePicker();
  }, [groupMembers]);

  useEffect(() => {
    if (allPlayersVoted) {
      const playerList = groupMembers.filter(
        (player) => player.status === "going"
      );
      setSessionPlayers(playerList);
    }
  }, [groupMembers]);

  return (
    <>
      <h1>Ready Player Sesh</h1>
      <Container>
        <Stack>
          <h2>RSVP</h2>
          {groupMembers.map((player, index) => {
            const isPicker = picker === index;
            const isUndecided = player.status === "undecided";
            const isGoing = player.status === "going";
            const isAbsent = player.status === "absent";

            return (
              <Card isGoing={isGoing} isAbsent={isAbsent}>
                <Stack>
                  <PlayerName>{capitalize(player.name)}</PlayerName>
                  <div>{isPicker && <Tag>Game picker</Tag>}</div>
                </Stack>
                <List>
                  <li>
                    <Label>
                      <input
                        type="radio"
                        name={`status-${player.name}`}
                        value="undecided"
                        checked={isUndecided}
                        onChange={handleStatusChange(index, "undecided")}
                        disabled={isGoing || isAbsent}
                      />{" "}
                      Undecided
                    </Label>
                  </li>
                  <li>
                    <Label>
                      <input
                        type="radio"
                        name={`status-${player.name}`}
                        value="going"
                        checked={isGoing}
                        onChange={handleStatusChange(index, "going")}
                      />{" "}
                      Going
                    </Label>
                  </li>
                  <li>
                    <Label>
                      <input
                        type="radio"
                        name={`status-${player.name}`}
                        value="absent"
                        checked={isAbsent}
                        onChange={handleStatusChange(index, "absent")}
                      />{" "}
                      Absent
                    </Label>
                  </li>
                </List>
              </Card>
            );
          })}
        </Stack>
        <Stack>
          <h2>Pick your boardgame</h2>

          {enoughAttendees ? (
            <form>
              <Stack>
                <Stack gap="8px">
                  <label htmlFor="boardgame-1">Game 1:</label>
                  <input type="text" name="boardgame-1" id="boardgame-1" />
                  <label htmlFor="boardgame-2">Game 2:</label>
                  <input type="text" name="boardgame-2" id="boardgame-2" />
                </Stack>
                <h3>Boardgame lists:</h3>
                <List>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://boardgamegeek.com/collection/user/Nizmox?geekranks=Board%20Game%20Rank&excludesubtype=boardgameexpansion&objecttype=thing&gallery=large&rankobjecttype=subtype&rankobjectid=1&columns=title%7Cstatus%7Cversion%7Crating%7Cbggrating%7Cplays%7Ccomment%7Ccommands&own=1&trade=0&want=0&wanttobuy=0&prevowned=0&ff=1&subtype=boardgame"
                    >
                      Simon.JS's boardgames
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://boardgamegeek.com/collection/user/mercury_sn?own=1&subtype=boardgame&ff=1"
                    >
                      Simon.NET's Boardgames
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://boardgamegeek.com/collection/user/daynemarais?own=1"
                    >
                      Dayne's boardgames
                    </a>
                  </li>
                </List>
              </Stack>
            </form>
          ) : (
            <p>Everyone needs to RSVP, and we need more than 3 to play</p>
          )}
        </Stack>
        <Stack>
          <h2>Next player order</h2>
          <ol>
            {enoughAttendees &&
              nextPlayerOrder().map((player) => <li>{player.name}</li>)}
          </ol>
        </Stack>
      </Container>
    </>
  );
}

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => (gap ? gap : "16px")};
`;

const Card = styled.div`
  flex: 1;
  display: flex;
  position: relative;
  justify-content: space-between;
  min-width: 300px;
  padding: 24px;
  border: 2px solid ${({ isGoing }) => (isGoing ? "#1fa35a" : "#6b6b6b")};
  border-radius: 6px;
  max-width: 300px;
  ${({ isGoing }) => isGoing && `background-color: #d4f7e5`};
  ${({ isAbsent }) => isAbsent && `background-color: #ededed`};
`;

const PlayerName = styled.div`
  font-weight: 700;
`;

const Label = styled.label`
  cursor: pointer;
`;

const Tag = styled.span`
  background-color: #1fa35a;
  padding: 3px 6px;
  font-size: 10px;
  color: #fff;
  font-weight: 700;
  border-radius: 6px;
  text-transform: uppercase;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  gap: 42px;
  & > * {
    padding-right: 42px;
    border-style: solid;
    border-width: 0 1px 0 0;
    border-color: #c3c3c3;
  }
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default App;
