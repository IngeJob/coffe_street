import React from 'react'
import { Box, Divider, Tabs, Tab } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery';
import { categoryProductProps } from "../features/types";


type MenuCategoryProps = {
  categories: categoryProductProps[]
}

export const MenuCategories = ({categories}: MenuCategoryProps) => {

  const [value, setValue] = React.useState(0);
  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const matches = useMediaQuery('(max-width:600px)');
  return (
    <Box
      display='flex'
      width={{xs:'100%', sm: '20%'}}
      sx={{
        mt: {xs: '0.5rem', md: '3vh'}, 
        mr: {xs: '0.5rem'}
      }}
    >
      <Box
        display='flex'
        sx={{
          maxWidth: '100%',
        }}
      > 
        <Tabs 
          value={value} 
          variant={matches ? "scrollable" : "standard"} 
          scrollButtons
          allowScrollButtonsMobile
          orientation={matches ? "horizontal" : "vertical"} 
          onChange={handleChange} 
        >
          {categories.map( ({name}, index) =>  
            <Tab 
              key={name}
              label={name}
              value={index} 
              href={`#${name}`}
              sx={{
                color: 'secondary.main',
                fontSize: {xs:'1.2rem', sm:'1.5rem'},
                textTransform: 'none',
              }}
            />
          )} 
        </Tabs>
      </Box>
      <Divider 
        orientation='vertical'
        sx={{
          backgroundColor: 'secondary.main'
        }}
      />
    </Box>
  )
}
