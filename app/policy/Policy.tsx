import React from 'react'
import { styles } from '../styles/style'

type Props = {}

const Policy = (props: Props) => {
  return (
    <div>
        <div className="w-[95%] 800px:w-[92%] m-auto py2 dark:text-white text-black px-3">
            <h1 className={`${styles.title} !text-start pt-2`}>
                Platform Terms and Policy
            </h1>
            <ul style={{listStyle:'unset',marginLeft:"15px"}}>
                <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis explicabo minima tenetur amet quas laboriosam architecto corporis molestiae reprehenderit voluptatem consequatur possimus unde, similique, officia, modi ipsum quibusdam ex fugiat.
                    Suscipit sequi perferendis aspernatur quis fuga dolor nemo recusandae a, voluptas illum asperiores numquam minus ipsam voluptates delectus. Veniam, aliquam repellat velit suscipit debitis aut. Iure illo molestiae voluptates eveniet!
                </p>
                <br />
                <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis explicabo minima tenetur amet quas laboriosam architecto corporis molestiae reprehenderit voluptatem consequatur possimus unde, similique, officia, modi ipsum quibusdam ex fugiat.
                    Suscipit sequi perferendis aspernatur quis fuga dolor nemo recusandae a, voluptas illum asperiores numquam minus ipsam voluptates delectus. Veniam, aliquam repellat velit suscipit debitis aut. Iure illo molestiae voluptates eveniet!
                </p>
                <br />
                <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis explicabo minima tenetur amet quas laboriosam architecto corporis molestiae reprehenderit voluptatem consequatur possimus unde, similique, officia, modi ipsum quibusdam ex fugiat.
                    Suscipit sequi perferendis aspernatur quis fuga dolor nemo recusandae a, voluptas illum asperiores numquam minus ipsam voluptates delectus. Veniam, aliquam repellat velit suscipit debitis aut. Iure illo molestiae voluptates eveniet!
                </p>
                <br />
            </ul>
        </div>
    </div>
  )
}

export default Policy