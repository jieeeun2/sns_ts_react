import { FC } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'

export interface CustomFile extends File {
  preview: string
}
interface UploadImageProps {
  images: File[]
  changeImages: (newImages: File[]) => void
}
const UploadImage: FC<UploadImageProps> = ({ images, changeImages }) => {
  const addImage = (acceptedFiles: File[]) => {
    changeImages([...images, ...acceptedFiles])
  }

  const deleteImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    changeImages(newImages)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: addImage })

  return (
    <UploadImageLayout>
      <InputBox {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? <p>여기다 놓아주세요!</p> : <p className='info_add'>+</p>}
      </InputBox>
      <PreviewBox>
        <PreviewListSection>
          {images?.map((image, index) => (
            <PreivewSection key={index} onClick={() => deleteImage(index)}>
              <img src={URL.createObjectURL(image)} />
            </PreivewSection>
          ))}
        </PreviewListSection>
        {images.length > 0 && <p className='info_delete'>삭제하시려면 이미지를 클릭해주세요.</p>}
      </PreviewBox>
    </UploadImageLayout>
  )
}

export default UploadImage

const UploadImageLayout = styled.div`
  padding: 12px;
  box-sizing: border-box;
  border: ${({ theme }) => `1px solid ${theme.neutral.dark}`};
  border-radius: 8px;
`

const InputBox = styled.div`
  height: 100px;
  border: ${({ theme }) => `1px dashed ${theme.neutral.dark}`};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  p {
    margin: 0;
    font-size: 14px;

    &.info_add {
      text-align: center;
      font-size: 40px;
      padding-bottom: 8px;
    }
  }
`

const PreviewBox = styled.div`
  p.info_delete {
    text-align: center;
    margin-bottom: 4px;
    font-size: 14px;
  }
`

const PreviewListSection = styled.div`
  display: flex;
  gap: 4px;
`

const PreivewSection = styled.div`
  width: 100px;
  height: 100px;
  margin-top: 12px;
  box-sizing: border-box;
  border-radius: 4px;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    border: ${({ theme }) => `2px solid ${theme.neutral.dark}`};
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    object-fit: cover;
  }
`
