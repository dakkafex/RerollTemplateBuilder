import { JsonView, allExpanded, darkStyles, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

export const Output = ({ json }) => (
    <div className='my-5'>
        <JsonView data={JSON.stringify(json)} shouldExpandNode={allExpanded} style={darkStyles} />
    </div>
)