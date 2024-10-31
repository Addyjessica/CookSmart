import * as React from 'react';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import HomeRounded from '@mui/icons-material/HomeRounded';
import { Link } from 'react-router-dom';
import { BiHeart } from 'react-icons/bi';
import { VscNote } from 'react-icons/vsc';
import { Restaurant } from '@mui/icons-material';
import { Stack } from '@mui/joy';
import { useMediaQuery } from '@mui/material';

const useRovingIndex = (options) => {
  const {
    initialActiveIndex = 0,
    vertical = false,
    handlers = {
      onKeyDown: () => {},
    },
  } = options || {};
  const [activeIndex, setActiveIndex] = React.useState(initialActiveIndex);
  const targetRefs = React.useRef([]);
  const targets = targetRefs.current;

  const focusNext = () => {
    let newIndex = activeIndex + 1;
    if (newIndex >= targets.length) {
      newIndex = 0;
    }
    targets[newIndex]?.focus();
    setActiveIndex(newIndex);
  };

  const focusPrevious = () => {
    let newIndex = activeIndex - 1;
    if (newIndex < 0) {
      newIndex = targets.length - 1;
    }
    targets[newIndex]?.focus();
    setActiveIndex(newIndex);
  };

  const getTargetProps = (index) => ({
    ref: (ref) => {
      if (ref) {
        targets[index] = ref;
      }
    },
    tabIndex: activeIndex === index ? 0 : -1,
    onKeyDown: (event) => {
      if (Number.isInteger(activeIndex)) {
        if (event.key === (vertical ? 'ArrowDown' : 'ArrowRight')) {
          focusNext();
        }
        if (event.key === (vertical ? 'ArrowUp' : 'ArrowLeft')) {
          focusPrevious();
        }
        handlers.onKeyDown?.(event, { setActiveIndex });
      }
    },
    onClick: () => {
      setActiveIndex(index);
    },
  });

  return {
    activeIndex,
    setActiveIndex,
    targets,
    getTargetProps,
    focusNext,
    focusPrevious,
  };
};

export default function Navbar() {
  const { getTargetProps } = useRovingIndex();
  const isMobile = useMediaQuery('(max-width:600px)'); // Adjust the width as needed

  return (
    <Stack flexWrap="wrap" width="100px">
      <List
        role="menubar"
        orientation="horizontal"
        sx={{
          '--List-radius': '8px',
          '--List-padding': '4px',
          '--List-gap': '8px',
          '--ListItem-gap': '0px',
        }}
      >
        <ListItem role="none">
          <ListItemButton
            role="menuitem"
            {...getTargetProps(0)}
            component={Link}
            to="/"
          >
            <ListItemDecorator>
              <HomeRounded />
            </ListItemDecorator>
            {!isMobile && 'Home'}
          </ListItemButton>
        </ListItem>

        <ListItem role="none">
          <ListItemButton
            role="menuitem"
            {...getTargetProps(1)}
            component={Link}
            to="/nearby-restaurants"
          >
            <ListItemDecorator>
              <Restaurant />
            </ListItemDecorator>
            {!isMobile && 'Nearby Restaurants'}
          </ListItemButton>
        </ListItem>

        <ListItem role="none">
          <ListItemButton
            role="menuitem"
            {...getTargetProps(2)}
            component={Link}
            to="/favorite"
          >
            <ListItemDecorator>
              <BiHeart color="danger" size={24} />
            </ListItemDecorator>
            {!isMobile && 'Favorite'}
          </ListItemButton>
        </ListItem>

        <ListItem role="none">
          <ListItemButton
            role="menuitem"
            {...getTargetProps(3)}
            component={Link}
            to="/planner"
          >
            <ListItemDecorator>
              <VscNote color="danger" size={24} />
            </ListItemDecorator>
            {!isMobile && 'Meal-planner'}
          </ListItemButton>
        </ListItem>
      </List>
    </Stack>
  );
}
