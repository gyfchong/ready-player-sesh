// @ts-nocheck
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { format } from "date-fns";
import styled from "@emotion/styled";
import capitalize from "capitalize";
import { isLoggedIn } from "../utils/auth";
import { Link, useParams } from "react-router-dom";
import nextSessionGamePicker from "../utils/nextSessionGamePicker";
import { Button } from "@adobe/react-spectrum";
import { sessionsById } from "../api/fetchSession";

const Session = () => {
  const { id } = useParams();
  const { data: currentSession } = useQuery("sessions", () => sessionsById(id));

  const [groupMembers, setGroupMembers] = useState();

  const [picker, setPicker] = useState(-1);
  const [attendees, setAttendees] = useState([]);

  const allPlayersVoted = () =>
    groupMembers.every((player) => player.status !== "undecided");

  const enoughAttendees = attendees.length >= 3;

  const setGamePicker = () => {
    const newPickerIndex = groupMembers.findIndex(
      (seshPlayer) => seshPlayer.status === "going"
    );

    setPicker(newPickerIndex);
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
    if (groupMembers) {
      setGamePicker();
    }
  }, [groupMembers]);

  useEffect(() => {
    if (groupMembers && allPlayersVoted()) {
      const playerList = groupMembers.filter(
        (player) => player.status === "going"
      );
      setAttendees(playerList);
    }
  }, [groupMembers]);

  useEffect(() => {
    if (currentSession) {
      setGroupMembers(currentSession.invitees);
    }
  }, [currentSession]);

  if (!groupMembers) {
    return "Getting session...";
  }

  return (
    <>
      {isLoggedIn() && <Link to="/dashboard">Dashboard</Link>}
      <h1>{format(new Date(currentSession.date), "cccc dd/MM/yy")}</h1>
      <Container>
        <Stack>
          <h2>RSVP</h2>
          {groupMembers.map((player, index) => {
            const isPicker = picker === index;
            const isGoing = player.status === "going";
            const isAbsent = player.status === "absent";

            return (
              <Card key={player.name} isGoing={isGoing} isAbsent={isAbsent}>
                <Stack gap="8px">
                  <PlayerName>{capitalize(player.name)}</PlayerName>
                  <div>{isPicker && <Tag>Game picker</Tag>}</div>
                </Stack>
                <List>
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
          {enoughAttendees ? (
            <form>
              <Stack>
                <h2>Pick your boardgame</h2>
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
                <Stack gap="8px">
                  <label htmlFor="boardgame-1">Game 1:</label>
                  <input type="text" name="boardgame-1" id="boardgame-1" />
                  <label htmlFor="boardgame-2">Game 2:</label>
                  <input type="text" name="boardgame-2" id="boardgame-2" />
                </Stack>

                <Button>Start session</Button>
              </Stack>
            </form>
          ) : (
            <p>Everyone needs to RSVP, and we need more than 3 to play</p>
          )}
        </Stack>
      </Container>
    </>
  );
};

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
  border: 2px solid ${({ isGoing }) => (isGoing ? "#1fa35a" : "#2e2e2e")};
  border-radius: 6px;
  max-width: 300px;
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
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default Session;
