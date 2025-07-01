import { Formik, Field, Form, FieldArray } from 'formik'

export const Backgrounds = ({ onSubmit }:
    {
        onSubmit: (data: unknown) => void;
    }
) => (
    <>
        <Formik
            initialValues={{
                name: 'Background',
                feature: '',
                feature_desc: '',
                skills_count_choose: 0,
                skills: [],
            }}
            onSubmit={(values) => {
                onSubmit(values);
                // alert(JSON.stringify(values, null, 2))
            }}
        >
            {({ values }) => (

                <Form className='space-y-4'>

                    <div>
                        <Field type="hidden" name="name" />
                    </div>

                    <div>
                        <label htmlFor="feature">Background Name</label>
                        <Field type="text" name="feature" placeholder="Background name" />
                    </div>

                    <div>
                        <label htmlFor="feature_desc">Feature description</label>
                        <Field as="textarea" name="feature_desc" className="form-textarea" placeholder="A description of the feature." />
                    </div>

                    <div>
                        <label htmlFor="skills_count_choose">Skills</label>
                        <div>
                            <small>How many skills can this background choose?</small>
                        </div>
                        <Field type="number" min='0' name="skills_count_choose"
                            onKeyDown={(e) => {
                                if (!/[0-9]/.test(e.key) && !['Backspace', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            onInput={(e) => {
                                const newCount = parseInt(e.target.value);
                                const current = values.skills.length;
                                if (newCount > current) {
                                    values.skills.push("");
                                } else if (newCount < current) {
                                    values.skills.pop();
                                }
                            }}
                        />
                    </div>

                    <div>
                        <label htmlFor="skills">Skills</label>
                        <FieldArray name="skills">
                            {() => (
                                <div>
                                    {values.skills.length > 0 &&
                                        values.skills.map((_, index) => (
                                            <div key={index}>
                                                <Field
                                                    type="text"
                                                    name={`skills.${index}`}
                                                    placeholder="e.g. Insight, Religion..."
                                                />
                                            </div>
                                        ))}
                                </div>
                            )}
                        </FieldArray>
                    </div>

                    <button className='w-96' type="submit">Submit</button>
                </Form>
            )}

        </Formik>
    </>
)