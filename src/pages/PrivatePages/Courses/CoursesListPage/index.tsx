import { Box, CircularProgress, List, useTheme } from "@mui/material";
import HeaderCoursesComponent from "../components/HeaderCoursesComponent";
import CourseCardComponent from "../components/CourseCardComponent";
import useCourse from "@hooks/useCourse";

export default function CoursesListPage() {
  const { palette: { primary, secondary } } = useTheme()
  const { loading, courses } = useCourse()

  function handleLoading() {
    return loading ?
      <Box sx={{
        display: 'flex',
        width: '70%',
        height: '80%',
      }}>
        <CircularProgress />
      </Box>
      :
      <List sx={{
        width: '70%',
        height: '80%',
      }}>
        {courses?.map(({ id, name, codCred, numCredits }) => (
          <CourseCardComponent
            key={id}
            name={name}
            codCred={codCred}
            numCredits={numCredits}
          />
        ))}
      </List>
  }

  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      py: '40px',
      px: '30px',
    }}>
      <HeaderCoursesComponent title={"Disciplinas"} />
      {handleLoading()}
    </Box>
  );
}
