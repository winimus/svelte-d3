import { writable } from 'svelte/store';

export const bar_domain = writable([
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
  ]);

  export const bar_data = writable([
    {
      name: "A",
      value: 10,
      color: "#FF0000",
    },
    {
      name: "B",
      value: 10,
      color: "#FF8000",
    },
    {
      name: "C",
      value: 10,
      color: "#FFFF00",
    },
    {
      name: "D",
      value: 10,
      color: "#80FF00",
    },
    {
      name: "E",
      value: 10,
      color: "#00FFFF",
    },
    {
      name: "F",
      value: 10,
      color: "#0080FF",
    },
    {
      name: "G",
      value: 10,
      color: "#0000FF",
    },
    {
      name: "H",
      value: 10,
      color: "#8000FF",
    },
    {
      name: "I",
      value: 10,
      color: "#FF00FF",
    },
    {
      name: "J",
      value: 10,
      color: "#848484",
    },
  ]);