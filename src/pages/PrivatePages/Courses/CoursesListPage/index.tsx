import { useNavigate } from "react-router";
import { Box, Skeleton, Stack } from "@mui/material";
import { Add } from "@mui/icons-material";
import useCourse from "@hooks/useCourse";
import HeaderCoursesComponent from "../components/HeaderCoursesComponent";
import CardComponent from "../components/CardComponent";
import ButtonCoursesComponent from "../components/ButtonCoursesComponent";
import ICourse from "@shared/ICourse";

export default function CoursesListPage() {
  const { loading, courses } = useCourse()
  const navigate = useNavigate()

  function Skeletons() {
    const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    return skeletons.map(({ }, index) => (
      <Skeleton
        key={index}
        variant={"rounded"}
        animation={"wave"}
        width={'100%'}
        height={'80px'}
      />
    ))
  }

  function handleNavigateToCourseDetails(course: ICourse) {
    navigate(`details/:${course.id}`, { state: course })
  }

  function handleRender() {
    return <Stack sx={{
      width: '70%',
      height: '70%',
      overflowY: 'scroll',
      overflowX: 'hidden',
      padding: '3px',
    }}
      spacing={'0.75rem'}
    >
      {loading ? Skeletons()
        : courses?.map((course) => (
          <CardComponent
            key={course.id}
            name={course.name}
            firstInfo={'Cód Cred: ' + course.codCred}
            secondInfo={'Créditos: ' + course.numCredits}
            onClick={() => handleNavigateToCourseDetails(course)}
          />
        ))
      }
    </Stack>
  }

  function handleNavigateToAddCourse() {
    navigate('add')
  }

  return (
    <Box sx={{
      width: '100%',
      height: '100%',
    }}>
      <HeaderCoursesComponent title={"Disciplinas"} mainScreen />
      {handleRender()}
      <Box sx={{
        width: '100%',
        height: '10%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: '2rem',
      }}>
        <ButtonCoursesComponent
          content={'Adicionar disciplina'}
          icon={<Add sx={{
            color: 'black',
            mr: '0.5rem'
          }} />}
          onClick={handleNavigateToAddCourse}
        />
      </Box>
    </Box>
  );
}
