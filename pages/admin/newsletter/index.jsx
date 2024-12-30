import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Delete, Edit, Send } from "@mui/icons-material";

export default function NewsletterManagement() {
  const [newsletters, setNewsletters] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentNewsletter, setCurrentNewsletter] = useState({
    subject: "",
    content: "",
  });

  // Mock data - replace with actual API calls
  useEffect(() => {
    setNewsletters([
      {
        id: 1,
        subject: "Summer Sale",
        content: "Check out our summer deals!",
        sent: "2023-06-15",
        subscribers: 150,
      },
      {
        id: 2,
        subject: "New Products",
        content: "Discover our latest items",
        draft: true,
        subscribers: 200,
      },
    ]);
  }, []);

  const handleCreateNewsletter = () => {
    setCurrentNewsletter({ subject: "", content: "" });
    setOpenDialog(true);
  };

  const handleSave = () => {
    // Add API call here to save newsletter
    setOpenDialog(false);
  };

  const handleDelete = (id) => {
    // Add API call here to delete newsletter
    setNewsletters(newsletters.filter((newsletter) => newsletter.id !== id));
  };

  const handleSendNewsletter = (id) => {
    // Add API call here to send newsletter
    alert("Newsletter sent successfully!");
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4" component="h1">
          Newsletter ManahaAclfgement
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateNewsletter}
        >
          Create Newsletter
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subject</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Sent Date</TableCell>
              <TableCell>Subscribers</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newsletters.map((newsletter) => (
              <TableRow key={newsletter.id}>
                <TableCell>{newsletter.subject}</TableCell>
                <TableCell>{newsletter.draft ? "Draft" : "Sent"}</TableCell>
                <TableCell>{newsletter.sent || "-"}</TableCell>
                <TableCell>{newsletter.subscribers}</TableCell>
                <TableCell>
                  <IconButton onClick={() => setOpenDialog(true)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(newsletter.id)}>
                    <Delete />
                  </IconButton>
                  {newsletter.draft && (
                    <IconButton
                      onClick={() => handleSendNewsletter(newsletter.id)}
                    >
                      <Send />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {currentNewsletter.id ? "Edit Newsletter" : "Create Newsletter"}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Subject"
            value={currentNewsletter.subject}
            onChange={(e) =>
              setCurrentNewsletter({
                ...currentNewsletter,
                subject: e.target.value,
              })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Content"
            value={currentNewsletter.content}
            onChange={(e) =>
              setCurrentNewsletter({
                ...currentNewsletter,
                content: e.target.value,
              })
            }
            margin="normal"
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
