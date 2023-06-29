import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Genres from "./shared/genre/Genres"
// import GenreProvider from "../../shared/GenreProvider";
import Typography from '@mui/material/Typography';


const SimpleAccordion = () => {

    
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Select Movie Genre</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Genres
            className="text-2xl bg-slate-500"
            // selectedGenres={selectedGenres}
            // setSelectedGenres={setSelectedGenres}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default SimpleAccordion;
