import {CardSubtitle, CardTitle, CardTitleContainer, CardTitleWrapper} from './CardElements'
import Button from '../Buttons'
import MoreIcon from '../icons/More/MoreIcon'
import Tooltip from '../Tooltip'
import ButtonGroup from '../Buttons/ButtonGroup'
import EditIcon from '../icons/Edit/EditIcon'
import TrashcanIcon from '../icons/Trashcan/TrashcanIcon'

type CardTitleProps = {
    title: string
    subtitle: string
    headerTitle: string
    onClick: () => void
    onDelete: () => void
}

const CardHeader = ({title, subtitle, headerTitle, onClick, onDelete}: CardTitleProps) => {
    return (
        <CardTitleContainer>
            <CardTitleWrapper>
                <CardTitle>{title}</CardTitle>
                <CardSubtitle>{subtitle}</CardSubtitle>
            </CardTitleWrapper>
            <Tooltip
                content={
                    <ButtonGroup spacing={2} direction="column">
                        <Button
                            size="lg"
                            Icon={<EditIcon />}
                            onClick={onClick}
                            fw="700"
                        >
                            {headerTitle}
                        </Button>
                        <Button
                            size="lg"
                            colorScheme="error"
                            Icon={<TrashcanIcon />}
                            onClick={onDelete}
                            fw="700"
                        >
                            Delete
                        </Button>
                    </ButtonGroup>
                }
                direction="bottom"
            >
                <Button shape="icon" variant="outline" size="lg">
                    <MoreIcon />
                </Button>
            </Tooltip>
        </CardTitleContainer>
    );
};

export default CardHeader;
