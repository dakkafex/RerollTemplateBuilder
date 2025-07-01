import { Formik, Field, Form, FieldArray } from 'formik'

export const Classes = ({ onSubmit }:
    {
        onSubmit: (data: unknown) => void;
    }
) => (
    <>
        <Formik
            initialValues={{
                name: '',
                hit_die: 8,
                combat_resource: null,
                skills_count_choose: 0,
                skills: [],
                saving_throws: [],
                level_for_subclass: 0,
                levels_for_asi_bonuses: [[]],
                class_features: [],
                levels: [],
            }}
            onSubmit={(values) => {
                onSubmit(values);
                // alert(JSON.stringify(values, null, 2))
            }}
        >
            {({ values }) => (
                <Form className='space-y-4'>
                    <div>
                        <label htmlFor="name">Class Name</label>
                        <Field type="text" name="name" placeholder="Class name" />
                    </div>

                    <div>
                        <NumberField title='Hit Die' name='hit_die' />
                    </div>

                    <div>
                        <label htmlFor="combat_resource">Combat Resource</label>
                        <div>
                            <small>
                                This is for things like Rage uses or Ki points
                            </small>
                        </div>
                        <Field type="text" name="combat_resource" placeholder="Resource name" />
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

                    <div>
                        <label htmlFor="saving_throws">Saving Throws</label>
                        <SavingCheck title='DEX' name='saving_throws' />
                        <SavingCheck title='INT' name='saving_throws' />
                        <SavingCheck title='CHA' name='saving_throws' />
                        <SavingCheck title='STR' name='saving_throws' />
                        <SavingCheck title='WIS' name='saving_throws' />
                        <SavingCheck title='CON' name='saving_throws' />
                    </div>

                    <div>
                        <NumberField title='Subclass level' name='level_for_subclass' />
                    </div>



                    <button className='w-96' type="submit">Submit</button>
                </Form>
            )}

        </Formik>
    </>
)

function SavingCheck({ title, name }: { title: string, name: string }) {
    return (
        <div className='checkinput'>
            <label>
                <Field type="checkbox" name={name} value={title} />
                {title}
            </label>
        </div>
    );
}

function NumberField({ title, name }: { title: string, name: string }) {
    return (
        <>
            <label htmlFor={name}>{title}</label>
            <Field type="number" min='0' name={name}
                onKeyDown={(e) => {
                    if (!/[0-9]/.test(e.key) && !['Backspace', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
                        e.preventDefault();
                    }
                }}
            />
        </>
    );
}