import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta = {
    title: 'Example/Select',
    component: Select,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    parameters: {
      // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
      layout: 'fullscreen',
    },
  } satisfies Meta<typeof Select>


  export default meta;
  type Story = StoryObj<typeof meta>;

  

  export const Default: Story = {
    args:{
      lists:[  "Toyota Supra (1993-2002)",
      "Nissan Skyline GT-R (1989-2002)",
      "Honda NSX (1990-2005)",
      "Mazda RX-7 (1992-2002)",
      "Subaru Impreza WRX (1992-2000)"],
      placeholder:'Select your car',
      onChange:(value)=>{
        console.log(value)
      },
      maxWidth:0
    }
  };