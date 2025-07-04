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
                combat_resource: '',
                skills_count_choose: 0,
                skills: [],
                saving_throws: [],
                level_for_subclass: 0,
                levels_for_asi_bonuses: [[4, 8, 12, 16, 19]],
                class_features: [],
                levels: [],
            }}
            onSubmit={(values) => {
                onSubmit(values);
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
                        <NumberField title='Subclass level' name='level_for_subclass' max={3} />
                    </div>

                    <div>
                        <label htmlFor="levels_for_asi_bonuses">Ability Score Increases</label>
                        <div>
                            <small>
                                Levels for ability score increase
                            </small>
                        </div>
                        <Field type="text" name="levels_for_asi_bonuses" />
                    </div>

                    <div>
                        <label htmlFor="class_features">Class Feats</label>


                        <FieldArray name="class_features">
                            {({ pop, remove, push }) => (
                                <div>
                                    <button type="button" onClick={() => push({ name: '', desc: '', level: 0 })}>Add Feat</button>
                                    <button type="button" onClick={() => pop()}>-</button>
                                    {values.class_features.length > 0 &&
                                        values.class_features.map((_, index) => (
                                            <div className="border rounded shadow p-2 my-3" key={index}>
                                                <FeatureField index={index} />

                                                <button
                                                    type="button"
                                                    className="secondary"
                                                    onClick={() => remove(index)}
                                                >
                                                    X
                                                </button>

                                            </div>
                                        ))}
                                </div>
                            )}
                        </FieldArray>
                    </div>


                    <label htmlFor="">Levels</label>
                    <div className='flex-row flex flex-wrap'>
                        <Levels values={values} />
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

function NumberField({ title, name, max }: { max?: number, title: string, name: string }) {
    return (
        <div className='nr-cont'>
            <label htmlFor={name}>{title}</label>
            <Field type="number" min='0' max={max} name={name}
                onKeyDown={(e) => {
                    if (!/[0-9]/.test(e.key) && !['Backspace', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
                        e.preventDefault();
                    }
                }}
            />
        </div>
    );
}

function FeatureField({ index }: { index: any }) {
    return (
        <>
            <label htmlFor="name">Name</label>
            <Field name={`class_features.${index}.name`} placeholder="Feat name" type="text" />

            <label htmlFor="desc">Description</label>
            <Field name={`class_features.${index}.desc`} as="textarea" className="form-textarea" placeholder="A description of the feature." />

            <NumberField name={`class_features.${index}.level`} title='Req. level' />
        </>
    );
}

function Levels({ values }: { values: any }) {

    for (let index = 0; values.levels.length < 20 && index < 20; index++) {
        values.levels.push({
            number: index + 1,
            prof_bonus: 0,
            spells_levels: [
                [2, 0, 0, 0, 0, 0, 0, 0, 0]
            ]
        })

    }

    return (
        <>
            {values.levels.map((level, i) => <Level key={i} index={i} />)}
        </>
    )
}

function Level({ index }: { index: any }) {
    return (
        <>
            <div className='border rounded p-2 m-2 shadow w-1/4'>
                <NumberField title={`Proficiency Bonus Level ${index + 1}`} name={`levels[${index}].prof_bonus`} />

                <label htmlFor="spells_levels" className='my-2'>Spell Slots</label>
                <div className='spell-slots w-1/1'>
                    <NumberField title='Lvl 1' name={`levels[${index}].spells_levels[0][0]`} />
                    <NumberField title='Lvl 2' name={`levels[${index}].spells_levels[0][1]`} />
                    <NumberField title='Lvl 3' name={`levels[${index}].spells_levels[0][2]`} />
                    <NumberField title='Lvl 4' name={`levels[${index}].spells_levels[0][3]`} />
                    <NumberField title='Lvl 5' name={`levels[${index}].spells_levels[0][4]`} />
                    <NumberField title='Lvl 6' name={`levels[${index}].spells_levels[0][5]`} />
                    <NumberField title='Lvl 7' name={`levels[${index}].spells_levels[0][6]`} />
                    <NumberField title='Lvl 8' name={`levels[${index}].spells_levels[0][7]`} />
                    <NumberField title='Lvl 9' name={`levels[${index}].spells_levels[0][8]`} />
                </div>
            </div>
        </>
    );
}