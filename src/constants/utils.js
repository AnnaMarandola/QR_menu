import TEMP1 from '../assets/templates/snapshotTemp1.png';
import TEMP2 from '../assets/templates/snapshotTemp2.png';
import TEMP3 from '../assets/templates/snapshotTemp3.png';

export const getTemplateImage = template => {
    switch(template) {
        case template1:
            return TEMP1
        case template2:
            return TEMP2
        case template3:
            return TEMP3
        default:
            return null
    }
}
