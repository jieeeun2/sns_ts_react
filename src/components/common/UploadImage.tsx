import { FC } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'

interface UploadImageProps {
  isUpdateMode?: boolean
  images: File[]
  imagePaths?: string[] //post등록에서는 필요없고 post수정시에만 필요한 속성
  changeImages: (newImages: File[], newImagePaths: string[]) => void
}

const UploadImage: FC<UploadImageProps> = ({
  isUpdateMode = false,
  images,
  imagePaths = [],
  changeImages,
}) => {
  const addImage = (acceptedFiles: File[]) => {
    changeImages([...images, ...acceptedFiles], imagePaths)
  }

  const deleteImage = (kind: 'image' | 'imagePath', index: number) => {
    const newImages = [...images]
    const newImagePaths = [...imagePaths]

    kind === 'image' ? newImages.splice(index, 1) : newImagePaths.splice(index, 1)

    changeImages(newImages, newImagePaths)
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
            <PreivewSection key={index} onClick={() => deleteImage('image', index)}>
              <img src={URL.createObjectURL(image)} />
            </PreivewSection>
          ))}
          {isUpdateMode &&
            imagePaths?.map((imagePath, index) => (
              <PreivewSection key={index} onClick={() => deleteImage('imagePath', index)}>
                <img src={imagePath} />
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
