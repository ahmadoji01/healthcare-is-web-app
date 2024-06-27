import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"

const QueueCard = ({ number=0, name="" }) => {

    const {t} = useTranslation();

    return (
        <div className="w-1/3 p-6 flex-col">
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {t('queue_number')}
                    </Typography>
                    <Typography variant="h2" fontWeight="700" component="div" textAlign="center">
                        {number}
                    </Typography>
                    <Typography variant="h5" fontWeight="400" textAlign="center">
                        {name}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default QueueCard;