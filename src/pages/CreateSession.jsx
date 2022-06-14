// @ts-nocheck

import styled from "@emotion/styled";
import { Link, Outlet } from "react-router-dom";
import { useProtectedRoute } from "../utils/auth";

import {
  ComboBox,
  Flex,
  Heading,
  Item,
  Section,
  Text,
  TextField,
  View,
  Checkbox,
  Button,
} from "@adobe/react-spectrum";

import { DatePicker, TimeField } from "@react-spectrum/datepicker";

import { useQuery } from "react-query";
import fetchGroups from "../api/fetchGroups";
import { useState } from "react";

const CreateSession = () => {
  useProtectedRoute();
  const [date, setDate] = useState();

  const { data: groups, isSuccess: groupsLoaded } = useQuery("groups", () =>
    fetchGroups()
  );

  return (
    <View
      borderWidth="thin"
      borderColor="dark"
      borderRadius="medium"
      padding="size-250"
    >
      <Heading level={1} marginTop={0}>
        New session
      </Heading>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          console.info(event);
        }}
      >
        <Flex direction="column" gap="size-150">
          <TextField label="Name (optional)" width="size-3600" />
          <DatePicker label="Session date" width="size-3600" required />

          {groupsLoaded && (
            <ComboBox
              label="Select people to join this session"
              width="size-3600"
              menuTrigger="focus"
              defaultInputValue={groups[0].name}
              allowsCustomValue
            >
              <Section title="Recently played with">
                <Item key="recent">Placeholder</Item>
              </Section>

              <Section title="Groups" items={groups}>
                {(item) => (
                  <Item key={item.name} textValue={item.name}>
                    <Text>{item.name}</Text>
                    <Text slot="description">{item.members.join(", ")}</Text>
                  </Item>
                )}
              </Section>
            </ComboBox>
          )}
          <Button type="submit" width="single-line-width">
            Open Sesh
          </Button>
        </Flex>
      </form>
    </View>
  );
};

export default CreateSession;
