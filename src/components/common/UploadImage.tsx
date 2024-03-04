import { FC } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'

/** UploadImage 컴포넌트
 * 이미지 업로드, 미리보기, 삭제 담당
 *
 * 게시글 수정모드일때 새 이미지 업로드 가능하고 기존이미지에도 미리보기와 삭제 가능
 * 상태값은 항상 부모컴포넌트에서 가지고있는데, Single Source of Truth 준수로 데이터 일관성과 관리 용이
 *
 * isUpdateMode: 게시물 수정모드 여부
 * images: 업로드한 새 이미지들
 * existingImagePaths: (게시글 수정시에만 사용) 서버에 올라가있는 이미지 경로들
 * imagePathsToDelete: (게시글 수정시에만 사용) 서버에서 삭제할 이미지 경로들
 * changeImages: 부모컴포넌트에 있는 상태값 업데이트 함수
 */

/* export type ImageData = 
  { newImages: File[] } | { newExistingImagePaths: string[], newImagePathsToDelete: string[] } */

interface UploadImageProps {
  isUpdateMode?: boolean
  images: File[]
  existingImagePaths?: string[]
  imagePathsToDelete?: string[]
  changeImages: ({
    newImages,
    newExistingImagePaths,
    newImagePathsToDelete,
  }: {
    newImages?: File[]
    newExistingImagePaths?: string[]
    newImagePathsToDelete?: string[]
  }) => void
  // changeImages: (data: ImageData) => void
}

const UploadImage: FC<UploadImageProps> = ({
  isUpdateMode = false,
  images,
  existingImagePaths = [],
  imagePathsToDelete = [],
  changeImages,
}) => {
  const addImage = (acceptedFiles: File[]) => {
    changeImages({ newImages: [...images, ...acceptedFiles] })
  }

  const deleteImage = (kind: 'image' | 'imagePath', index: number) => {
    if (kind === 'image') {
      const newImages = [...images]
      newImages.splice(index, 1)

      changeImages({ newImages })
    } else {
      const newExistingImagePaths = [...existingImagePaths]
      newExistingImagePaths.splice(index, 1)

      const newImagePathsToDelete = [...imagePathsToDelete]
      newImagePathsToDelete.push(existingImagePaths[index])

      changeImages({ newExistingImagePaths, newImagePathsToDelete })
    }
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
            existingImagePaths?.map((imagePath, index) => (
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
