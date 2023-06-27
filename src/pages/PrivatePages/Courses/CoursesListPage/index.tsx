import { Box, List, Skeleton } from "@mui/material";
import useCourse from "@hooks/useCourse";
import HeaderCoursesComponent from "../components/HeaderCoursesComponent";
import CardCourseComponent from "../components/CardCourseComponent";
import ButtonCoursesComponent from "../components/ButtonCoursesComponent";

export default function CoursesListPage() {
  const { loading, courses } = useCourse()

  function Skeletons() {
    const skeletons = [1, 2, 3, 4, 5, 6]
    return skeletons.map(({ }, index) => (
      <Skeleton
        key={index}
        variant={"rounded"}
        animation={"wave"}
        width={'100%'}
        height={'80px'}
        sx={{
          mb: '12px'
        }}
      />
    ))
  }

  function handleLoading() {
    return loading ?
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '70%',
        height: '70%',
      }}>
        {Skeletons()}
      </Box>
      :
      <List sx={{
        width: '70%',
        height: '70%',
        overflowY: 'scroll',
        overflowX: 'hidden',
        padding: '3px'
      }}>
        {courses?.map(({ id, name, codCred, numCredits }) => (
          <CardCourseComponent
            key={id}
            name={name}
            codCred={codCred}
            numCredits={numCredits}
            marginBottom={'12px'}
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
      <Box sx={{
        width: '100%',
        height: '10%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
      }}>
        <ButtonCoursesComponent content={'Criar'} />
      </Box>
    </Box>
  );
}
