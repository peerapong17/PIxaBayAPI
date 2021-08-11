import React, { useState } from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import { Props } from "./interface/props";
import { Image } from "./interface/image";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.9)",
  },
  dialog: {
    height: 4000,
    width: 5000,
  },
}));

const ImageResult: React.FC<Props> = ({ images }) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<Image>({
      id: '',
      largeImageURL: '',
      pageURL: '',
      tags: '',
      user: ''
  });

  const handleClickOpen = (image:Image) => {
    setOpen(true);
    setCurrentImage(image);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <GridList cellHeight={300} cols={3}>
        {images.map((image) => (
          <GridListTile key={image.id}>
            <img src={image.largeImageURL} alt={image.tags} />
            <GridListTileBar
              title={image.tags}
              subtitle={<span>by: {image.user}</span>}
              actionIcon={
                <IconButton
                  className={classes.icon}
                  onClick={() => handleClickOpen(image)}
                >
                  <ZoomInIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
        <Dialog
          className={classes.dialog}
          maxWidth="xs"
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <img
            src={currentImage!.largeImageURL}
            alt={currentImage!.tags}
            style={{ width: "100%" }}
          />
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </GridList>
    </div>
  );
};

export default ImageResult;
