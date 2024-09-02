import React, { useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from '@nextui-org/react'

export default function DataManagementModal({
  mode,
  button,
}: {
  mode: 'save' | 'load'
  button: { size: 'sm' | 'md' | 'lg'; color: 'primary' | 'default' }
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const title =
    mode === 'save' ? 'please input saving title' : 'please input loading title'
  const [name, setName] = useState('')
  return (
    <>
      <Button
        onPress={onOpen}
        size={button.size}
        color={button.color}
        variant="flat"
      >
        {mode}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  onChange={(e) => setName(e.target.value)}
                  label="name"
                  variant="bordered"
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: 'text-small',
                    }}
                  >
                    allow overwrite
                  </Checkbox>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  {mode}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
