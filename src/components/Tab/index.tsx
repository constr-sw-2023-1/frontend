import { ListItem, ListItemButton, ListItemIcon, ListItemProps, ListItemText, Typography, useTheme } from "@mui/material";
import { ReactElement } from "react";

interface TabProps extends ListItemProps {
    icon: ReactElement
    name: string
    isSelected: boolean
}

export default function Tab({
    icon,
    name,
    isSelected = false
}: TabProps) {
    const { palette: { primary, text } } = useTheme()

    return (
        <ListItem sx={{
            bgcolor: isSelected ? primary.main : 'transparent',
            color: isSelected ? 'white' : text.primary,
            padding: 0
        }}>
            <ListItemButton sx={{
                px: '2rem',
            }}>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>

                <ListItemText sx={{
                    paddingY: '0.5rem',
                }}><Typography sx={{
                    color: text.primary,
                    fontWeight: 500
                }}>{name}</Typography>
                </ListItemText>
            </ListItemButton>
        </ListItem>
    )
}